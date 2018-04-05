import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import LoginButton from "../../containers/login_button"
import DrawerMenu from "../drawer";
import history from "../../history";

class Header extends Component{
    constructor(props){
        super(props);
    }
    
    selectStyle(){
        if(this.props.main)
            return {position: 'absolute', backgroundColor: 'transparent', height: 50}
        else 
            return {height: 50}
    }


    render(){ 
        return(
            <AppBar
                style={this.selectStyle()}
                title="WITHUMB"
                zDepth={0}
                onTitleClick={() => history.push('/')}
                iconElementRight={<LoginButton/>}
                iconElementLeft={<DrawerMenu />}
            />
        );
    }
}

export default Header;
