/* eslint-disable */
import { admin, firestore, functions, firestorePostRef, firestoreTripRef } from "./firebase";
import { ResponseCodes } from "./responseCode";

/**
 * 4-01. 특정 여행과 연결된 게시물 추가
 */
// export const createPost = functions.https.onCall(async (data) => {
//     try {
//         const post = data.post;
//         const postRef = firestorePostRef.doc();
//         const tripRef = firestoreTripRef.doc(post.trip_id);

//         post.created_at = new admin.firestore.Timestamp(post.start_date.seconds, post.start_date.nanoseconds);

//         if (!(await tripRef.get()).exists) {
//             console.log("[postFunctions/createPost] Trip not found: " + post.trip_id);
//             return { result: ResponseCodes.FAILURE, type: ResponseCodes.TRIP_NOT_FOUND };
//         }

//         await postRef.set(post);

//         console.log("[postFunctions/createPost] Post created: " + postRef.id);
//         return { result: ResponseCodes.SUCCESS, data: postRef.id };
//     } catch (error) {
//         console.log("[postFunctions/createPost] Error: " + error);
//         return { result: ResponseCodes.FAILURE, type: ResponseCodes.SERVER_ERROR };
//     }
// });

/**
 * 4-04. 특정 게시물 수정
 */
export const updatePost = functions.https.onCall(async (data) => {
    try {
        const postId = data.post_id;
        const updateFields = data.update_fields;

        if (!(await firestorePostRef.doc(postId).get()).exists) {
            console.log("[postFunctions/updatePost] Post not found: " + postId);
            return { result: ResponseCodes.FAILURE, type: ResponseCodes.POST_NOT_FOUND };
        }

        await firestorePostRef.doc(postId).update(updateFields);

        console.log("[postFunctions/updatePost] Post updated: " + postId);
        return { result: ResponseCodes.SUCCESS };
    } catch (error) {
        console.log("[postFunctions/updatePost] Error: " + error);
        return { result: ResponseCodes.FAILURE, type: ResponseCodes.SERVER_ERROR };
    }
});

/**
 * 4-05. 특정 게시물 삭제
 */
export const deletePost = functions.https.onCall(async (data) => {
    try {
        const postId = data.post_id;

        if (!(await firestorePostRef.doc(postId).get()).exists) {
            console.log("[postFunctions/deletePost] Post not found: " + postId);
            return { result: ResponseCodes.FAILURE, type: ResponseCodes.POST_NOT_FOUND };
        }

        await firestorePostRef.doc(postId).delete();

        console.log("[postFunctions/deletePost] Post deleted: " + postId);
        return { result: ResponseCodes.SUCCESS };
    } catch (error) {
        console.log("[postFunctions/deletePost] Error: " + error);
        return { result: ResponseCodes.FAILURE, type: ResponseCodes.SERVER_ERROR };
    }
});