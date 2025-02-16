import { withServerAction } from "@/libs/hocs/with-server-action";
import { createCollectionService } from "@/services/collection-services";

export const createCollectionAction = withServerAction<TCreateCollection, void>(
  createCollectionService,
);
