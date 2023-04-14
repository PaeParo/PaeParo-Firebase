/* eslint-disable */
import { admin, firestore, functions, firestoreTripRef, firestoreEventRef, firestoreTripUpdateRef } from "./firebase";
import { ResponseCodes } from "./responseCode";
import { TripUpdateType } from "./constants";

/**
 * 2-01. 새로운 여행 생성
 */
export const createTrip = functions.https.onCall(async (data, context) => {
    try {
        const trip = data.trip;
        const userId = data.user_id;
        const tripRef = firestoreTripRef.doc();
        const tripUpdateRef = firestoreTripUpdateRef.doc(tripRef.id);
        const batch = firestore.batch();

        batch.set(tripRef, trip);
        batch.set(tripUpdateRef,
            {
                user_id: userId,
                event_reference: "",
                update_type: TripUpdateType.CREATE,
                timestamp: admin.firestore.Timestamp.now().seconds
            }
        );

        await batch.commit();

        console.log("[tripFunctions/createTrip] Trip created: " + tripRef.id);
        return { result: ResponseCodes.SUCCESS, trip_id: tripRef.id };
    } catch (error) {
        console.log("[tripFunctions/createTrip] Error: " + error);
        return { result: ResponseCodes.UNKNOWN_ERROR };
    }
});

/**
 * 2-03. 특정 여행 수정
 */
export const updateTrip = functions.https.onCall(async (data, context) => {
    try {
        const tripId = data.trip_id;
        const updateFields = data.update_fields;

        if (!(await firestoreTripRef.doc(tripId).get()).exists) {
            console.log("[tripFunctions/updateTrip] Trip not found: " + tripId);
            return { result: ResponseCodes.TRIP_NOT_FOUND };
        }

        await firestoreTripRef.doc(tripId).update(updateFields);

        console.log("[tripFunctions/updateTrip] Trip updated: " + tripId);
        return { result: ResponseCodes.SUCCESS };
    } catch (error) {
        console.log("[tripFunctions/updateTrip] Error: " + error);
        return { result: ResponseCodes.UNKNOWN_ERROR };
    }
});

/**
 * 2-04. 특정 여행 삭제
 */
export const deleteTrip = functions.https.onCall(async (data, context) => {
    try {
        const tripId = data.trip_id;

        if (!(await firestoreTripRef.doc(tripId).get()).exists) {
            console.log("[tripFunctions/deleteTrip] Trip not found: " + tripId);
            return { result: ResponseCodes.TRIP_NOT_FOUND };
        }

        await firestoreTripRef.doc(tripId).delete();

        console.log("[tripFunctions/deleteTrip] Trip deleted: " + tripId);
        return { result: ResponseCodes.SUCCESS };
    } catch (error) {
        console.log("[tripFunctions/deleteTrip] Error: " + error);
        return { result: ResponseCodes.UNKNOWN_ERROR };
    }
});

/**
 * 2-05. 특정 여행에서 온 동행자 초대 수락
 */
export const acceptTripInvitation = functions.https.onCall(async (data, context) => {
    try {
        const tripId = data.trip_id;
        const userId = data.user_id;

        if (!(await firestoreTripRef.doc(tripId).get()).exists) {
            console.log("[tripFunctions/acceptTripInvitation] Trip not found: " + tripId);
            return { result: ResponseCodes.TRIP_NOT_FOUND };
        }

        await firestoreTripRef.doc(tripId).update({ [`members.${userId}`]: true });

        console.log("[tripFunctions/acceptTripInvitation] Trip invitation accepted: " + tripId);
        return { result: ResponseCodes.SUCCESS };
    } catch (error) {
        console.log("[tripFunctions/acceptTripInvitation] Error: " + error);
        return { result: ResponseCodes.UNKNOWN_ERROR };
    }
});

/**
 * 2-06. 특정 여행에서 온 동행자 초대 거절
 */
export const rejectTripInvitation = functions.https.onCall(async (data, context) => {
    try {
        const tripId = data.trip_id;
        const userId = data.user_id;

        if (!(await firestoreTripRef.doc(tripId).get()).exists) {
            console.log("[tripFunctions/rejectTripInvitation] Trip not found: " + tripId);
            return { result: ResponseCodes.TRIP_NOT_FOUND };
        }

        await firestoreTripRef.doc(tripId).update({ [`members.${userId}`]: false });

        console.log("[tripFunctions/rejectTripInvitation] Trip invitation rejected: " + tripId);
        return { result: ResponseCodes.SUCCESS };
    } catch (error) {
        console.log("[tripFunctions/rejectTripInvitation] Error: " + error);
        return { result: ResponseCodes.UNKNOWN_ERROR };
    }
});

/**
 * 2-07. 특정 여행에 이벤트 추가
 */
export const addEventToTrip = functions.https.onCall(async (data, context) => {
    try {
        const userId = data.user_id;
        const tripId = data.trip_id;
        const event = data.event;
        const tripUpdateRef = firestoreTripUpdateRef.doc(tripId);
        const eventRef = firestoreEventRef.doc();

        if (!(await firestoreTripRef.doc(tripId).get()).exists) {
            console.log("[tripFunctions/addEventToTrip] Trip not found: " + tripId);
            return { result: ResponseCodes.TRIP_NOT_FOUND };
        }

        const batch = firestore.batch();

        batch.set(eventRef, event);
        batch.update(tripUpdateRef, {
            user_id: userId,
            event_reference: `events/${tripId}/trip_events/${eventRef.id}`,
            update_type: TripUpdateType.ADD,
            timestamp: admin.firestore.Timestamp.now().seconds
        });

        await batch.commit();

        console.log("[tripFunctions/addEventToTrip] Event added to trip: " + tripId);
        return { result: eventRef.id };
    } catch (error) {
        console.log("[tripFunctions/addEventToTrip] Error: " + error);
        return { result: ResponseCodes.UNKNOWN_ERROR };
    }
});

/**
 * 2-08. 특정 여행에서 이벤트 삭제
 */
export const removeEventFromTrip = functions.https.onCall(async (data, context) => {
    try {
        const userId = data.user_id;
        const tripId = data.trip_id;
        const eventId = data.event_id;
        const eventRef = firestoreEventRef.doc(eventId);
        const tripUpdateRef = firestoreTripUpdateRef.doc(tripId);

        if (!(await firestoreTripRef.doc(tripId).get()).exists) {
            console.log("[tripFunctions/removeEventFromTrip] Trip not found: " + tripId);
            return { result: ResponseCodes.TRIP_NOT_FOUND };
        }

        if (!(await firestoreEventRef.doc(eventId).get()).exists) {
            console.log("[tripFunctions/removeEventFromTrip] Event not found: " + eventId);
            return { result: ResponseCodes.EVENT_NOT_FOUND };
        }

        const batch = firestore.batch();

        batch.delete(eventRef);
        batch.update(tripUpdateRef, {
            user_id: userId,
            event_reference: `events/${tripId}/trip_events/${eventId}`,
            update_type: TripUpdateType.REMOVE,
            timestamp: admin.firestore.Timestamp.now().seconds
        });

        await batch.commit();

        console.log("[tripFunctions/removeEventFromTrip] Event removed from trip: " + tripId);
        return { result: ResponseCodes.SUCCESS };
    } catch (error) {
        console.log("[tripFunctions/removeEventFromTrip] Error: " + error);
        return { result: ResponseCodes.UNKNOWN_ERROR };
    }
});

/**
 * 2-10. 특정 여행에 속한 특정 사용자 위치 업데이트
 */
export const updateUserLocation = functions.https.onCall(async (data, context) => {
    try {
        const tripId = data.trip_id;
        const locationUpdateInfo = data.location_update_info;

        if (!(await firestoreTripRef.doc(tripId).get()).exists) {
            console.log("[tripFunctions/updateUserLocation] Trip not found: " + tripId);
            return { result: ResponseCodes.TRIP_NOT_FOUND };
        }

        await firestoreTripUpdateRef.doc(tripId).update({
            [`member_locations.${locationUpdateInfo.user_id}`]: locationUpdateInfo
        });

        console.log("[tripFunctions/updateUserLocation] User location updated: " + tripId);
        return { result: ResponseCodes.SUCCESS };
    } catch (error) {
        console.log("[tripFunctions/updateUserLocation] Error: " + error);
        return { result: ResponseCodes.UNKNOWN_ERROR };
    }
});