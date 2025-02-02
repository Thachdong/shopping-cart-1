export const withServerAction = <TParams, TResult>(
  action: (params: TParams) => Promise<TResult>,
) => {
  return async function (
    params: TParams,
  ): Promise<IServerActionResponse<TResult>> {
    try {
      const result = await action(params);

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: JSON.stringify(error),
      };
    }
  };
};
