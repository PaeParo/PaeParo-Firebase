/* eslint-disable */
import { firestore, admin, functions, firestoreUserRef } from "./firebase";
import { ResponseCodes } from "./responseCode";

/**
 * 1-01. 사용자 로그인
 */
export const login = functions.https.onCall(async (data) => {
    try {
        const idToken = data.id_token;
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const userId = decodedToken.uid;

        // 사용자 등록 확인
        const userRef = admin.firestore().collection("users").doc(userId);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) { // 사용자가 등록되지 않았을 경우
            await userRef.set({
                nickname: "",
                thumbnail: "",
                age: 0,
                gender: "",
                travel_style: [],
                liked_posts: []
            });
            console.log("[userFunctions/loginWithGoogle] New user created: " + userId);
            return { result: ResponseCodes.NICKNAME_NOT_SET };
        }

        if (userSnapshot.data()?.nickname == "") { // 사용자가 등록되어있지만 닉네임이 설정되어있지 않을 경우
            console.log("[userFunctions/loginWithGoogle] User nickname not set: " + userId)
            return { result: ResponseCodes.NICKNAME_NOT_SET };
        }

        if (userSnapshot.data()?.age == 0) { // 사용자가 등록되어있지만 세부정보가 설정되어있지 않을 경우
            console.log("[userFunctions/loginWithGoogle] User detail info not set: " + userId)
            return { result: ResponseCodes.DETAIL_INFO_NOT_SET };
        }

        console.log("[userFunctions/loginWithGoogle] User logged in: " + userId);
        return { result: ResponseCodes.LOGIN_SUCCESS }
    } catch (error: unknown) {
        console.log("[userFunctions/loginWithGoogle] Error: " + error);
        return { result: ResponseCodes.UNKNOWN_ERROR };
    }
});

/**
 * 1-03. 특정 사용자 닉네임 설정
 */
export const updateUserNickname = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});

/**
 * 1-04. 특정 사용자 세부정보 설정
 */
export const updateUserDetailInfo = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});

/**
 * 1-07. 특정 사용자가 특정 게시글 좋아요 추가
 */
export const likePost = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});

/**
 * 1-08. 특정 사용자가 게시글 좋아요 취소
 */
export const cancelLikePost = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});

/**
 * 1-10. 특정 사용자 취향에 맞는 게시글 불러오기
 */
export const getPostByUserPreference = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});