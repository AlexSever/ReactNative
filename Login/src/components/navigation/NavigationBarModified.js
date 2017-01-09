import { Navigator } from 'react-native';

class NavigationBarModified extends Navigator.NavigationBar {
    render() {
        var routes = this.props.navState.routeStack;

        if (routes.length) {
            var route = routes[routes.length - 1];

            if (route.display === false) {
                return null;
            }
        }

        return super.render();
    }
}

export default NavigationBarModified;