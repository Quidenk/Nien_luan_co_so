// import { useMutation } from "@tanstack/react-query"

// export const useMutationHooks = (fnCallback) => {
//     const mutation = useMutation({
//         mutationFn: fnCallback
//     })
//     return mutation
// }

import { useMutation } from "@tanstack/react-query";

export const useMutationHooks = (fnCallback) => {
    const mutation = useMutation({
        mutationFn: fnCallback,
        onSuccess: (data) => {
            // Bạn có thể xử lý gì đó khi thành công ở đây
            console.log('Mutation successful:', data);
        },
        onError: (error) => {
            // Xử lý lỗi ở đây
            console.error('Mutation error:', error);
        }
    });

    return mutation;
};
