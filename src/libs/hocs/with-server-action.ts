/* eslint-disable @typescript-eslint/no-explicit-any */
export const withServerAction = <
  TAction extends (...args: any[]) => Promise<any>,
>(
  action: TAction,
) => {
  return async function (
    ...params: Parameters<TAction>
  ): Promise<IServerActionResponse<ReturnType<TAction>>> {
    try {
      const result = await action(...params);

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
