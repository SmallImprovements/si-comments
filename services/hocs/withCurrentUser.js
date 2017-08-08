import { Component, createElement } from 'react';
import { hoistStatics } from 'recompose';
import auth from '../auth';

export default function withCurrentUser(component) {
    const factory = comp => {
        class WithCurrentUser extends Component {
            constructor(props) {
                super(props);
                this.state = {
                    currentUser: auth.getUser(),
                    replacements: auth.getReplacements(),
                };
                this.listener = null;
            }

            componentWillMount() {
                this.listener = auth.onAuthChange((currentUser, replacements) => {
                    this.setState({ currentUser, replacements });
                });
            }

            componentWillUnmount() {
                if (this.listener) {
                    this.listener();
                    this.listener = null;
                }
            }

            render() {
                const { currentUser, replacements } = this.state;
                return createElement(comp, {
                    ...this.props,
                    currentUser,
                    replacements,
                });
            }
        }

        return WithCurrentUser;
    };

    return hoistStatics(factory)(component);
}
