import { compose } from "lodash/fp";
import withCurrentUser from "../../services/hocs/withCurrentUser";
import Presenter from "./presenter";

export default compose(withCurrentUser)(Presenter);
