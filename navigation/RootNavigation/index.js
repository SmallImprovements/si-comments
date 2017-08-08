import { compose } from "lodash/fp";
import withCurrentUser from "../../services/hocs/withCurrentUser";
import RootNavigator from "./presenter";

export default compose(withCurrentUser)(RootNavigator);
