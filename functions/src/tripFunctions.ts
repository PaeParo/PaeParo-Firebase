import { firestore, functions, firestoreTripRef } from "./index";
import { ResponseCodes } from "./responseCode";

/**
 * 2-01. 새로운 여행 생성
 */
export const createTrip = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});

/**
 * 2-03. 특정 여행 수정
 */
export const updateTrip = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});

/**
 * 2-04. 특정 여행 삭제
 */
export const deleteTrip = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});

/**
 * 2-05. 특정 여행에서 온 동행자 초대 수락
 */
export const acceptTripInvitaion = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});

/**
 * 2-06. 특정 여행에서 온 동행자 초대 거절
 */
export const rejectTripInvitaion = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});

/**
 * 2-07. 특정 여행에 이벤트 추가
 */
export const addEventToTrip = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});

/**
 * 2-08. 특정 여행에서 이벤트 삭제
 */
export const removeEventFromTrip = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});

/**
 * 2-10. 특정 여행에 속한 특정 사용자 위치 업데이트
 */
export const updateUserLocation = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});