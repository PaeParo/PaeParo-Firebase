/* eslint-disable */
import { firestore, admin, functions, firestoreUserRef, firestorePostRef } from "./firebase";
import { ResponseCodes } from "./responseCode";

/**
 * 1-01. 사용자 로그인
 */
export const login = functions.https.onCall(async (data) => {
    try {
        const idToken = data.id_token;
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const userId = decodedToken.uid;
        const userRef = firestoreUserRef.doc(userId);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) { // 사용자가 등록되지 않았을 경우
            await userRef.set({
                nickname: "",
                thumbnail: decodedToken.picture || "",
                age: 0,
                gender: "",
                travel_style: [],
                liked_posts: []
            });
            console.log("[userFunctions/loginWithGoogle] New user created: " + userId);
            return { result: ResponseCodes.SUCCESS, type: ResponseCodes.NICKNAME_NOT_SET };
        }

        if (userSnapshot.data()!.nickname == "") { // 사용자가 등록되어있지만 닉네임이 설정되어있지 않을 경우
            console.log("[userFunctions/loginWithGoogle] User nickname not set: " + userId)
            return { result: ResponseCodes.SUCCESS, type: ResponseCodes.NICKNAME_NOT_SET };
        }

        if (userSnapshot.data()!.age == 0) { // 사용자가 등록되어있지만 세부정보가 설정되어있지 않을 경우
            console.log("[userFunctions/loginWithGoogle] User detail info not set: " + userId)
            return { result: ResponseCodes.SUCCESS, type: ResponseCodes.DETAIL_INFO_NOT_SET, data: userSnapshot.data()!.nickname };
        }

        console.log("[userFunctions/loginWithGoogle] User logged in: " + userId);
        return { result: ResponseCodes.SUCCESS, type: ResponseCodes.ALL_DATA_SET, data: userSnapshot.data()!.nickname };
    } catch (error) {
        console.log("[userFunctions/loginWithGoogle] Error: " + error);
        return { result: ResponseCodes.FAILURE, type: ResponseCodes.SERVER_ERROR };
    }
});

/**
 * 1-03. 특정 사용자 닉네임 설정
 */
export const updateUserNickname = functions.https.onCall(async (data, context) => {
    try {
        const userId = data.user_id
        const nickname = data.nickname
        const userSnapshot = await firestoreUserRef.where("nickname", "==", nickname).limit(1).get();
        
        if (userSnapshot.docs.length > 0) {
            console.log("[userFunctions/updateUserNickname] Nickname already in use: " + nickname);
            return { result: ResponseCodes.FAILURE, type: ResponseCodes.NICKNAME_ALREADY_IN_USE };
        }

        await firestoreUserRef.doc(userId).update({
            nickname: nickname
        });
        
        console.log("[userFunctions/updateUserNickname] User nickname updated: " + userId);
        return { result: ResponseCodes.SUCCESS };
    } catch (error) {
        console.log("[userFunctions/updateUserNickname] Error: " + error);
        return { result: ResponseCodes.FAILURE, type: ResponseCodes.SERVER_ERROR };
    }
});

/**
 * 1-04. 특정 사용자 세부정보 설정
 */
export const updateUserDetailInfo = functions.https.onCall(async (data, context) => {
    try {
        const userId = data.user_id
        const updateFields = data.update_fields

        await firestoreUserRef.doc(userId).update(updateFields);

        console.log("[userFunctions/updateUserDetailInfo] User detail info updated: " + userId);
        return { result: ResponseCodes.SUCCESS };
    } catch (error) {
        console.log("[userFunctions/updateUserDetailInfo] Error: " + error);
        return { result: ResponseCodes.FAILURE, type: ResponseCodes.SERVER_ERROR };
    }
});

/**
 * 1-07. 특정 사용자가 특정 게시글 좋아요 추가
 */
export const likePost = functions.https.onCall(async (data, context) => {
    try {
        const postId = data.post_id;
        const userId = data.user_id;
        const postRef = firestorePostRef.doc(postId)
        const userRef = firestoreUserRef.doc(userId)

        if (!(await postRef.get()).exists) {
            console.log("[userFunctions/cancelLikePost] Post not found: " + postId);
            return { result: ResponseCodes.FAILURE, type: ResponseCodes.POST_NOT_FOUND };
        }

        const batch = firestore.batch();
        
        batch.update(postRef, "likes", admin.firestore.FieldValue.increment(1))
        batch.update(userRef, "liked_posts", admin.firestore.FieldValue.arrayUnion(postId))

        await batch.commit();

        console.log("[userFunctions/likePost] Post liked: " + postId);
        return { result: ResponseCodes.SUCCESS };
    } catch (error) {
        console.log("[userFunctions/likePost] Error: " + error);
        return { result: ResponseCodes.FAILURE, type: ResponseCodes.SERVER_ERROR };
    }
});

/**
 * 1-08. 특정 사용자가 게시글 좋아요 취소
 */
export const cancelLikePost = functions.https.onCall(async (data, context) => {
    try {
        const postId = data.post_id;
        const userId = data.user_id;
        const postRef = firestorePostRef.doc(postId)
        const userRef = firestoreUserRef.doc(userId)

        if (!(await postRef.get()).exists) {
            console.log("[userFunctions/cancelLikePost] Post not found: " + postId);
            return { result: ResponseCodes.FAILURE, type: ResponseCodes.POST_NOT_FOUND };
        }

        const batch = firestore.batch();

        batch.update(postRef, "likes", admin.firestore.FieldValue.increment(-1))
        batch.update(userRef, "liked_posts", admin.firestore.FieldValue.arrayRemove(postId))

        await batch.commit();

        console.log("[userFunctions/cancelLikePost] Post like canceled: " + postId);
        return { result: ResponseCodes.SUCCESS };
    } catch (error) {
        console.log("[userFunctions/cancelLikePost] Error: " + error);
        return { result: ResponseCodes.FAILURE, type: ResponseCodes.SERVER_ERROR };
    }
});

/**
 * 1-10. 특정 사용자 취향에 맞는 게시글 불러오기
 */
export const getPostByUserPreference = functions.https.onCall(async (data) => {
    try {
    } catch (error) {
        console.log("[userFunctions/getPostByUserPreference] Error: " + error);
    }
});