import React from 'react';
import { useDispatch, connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/reducers';


type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
}

function Template(props: Props) {

    return (
        <React.Fragment>
            
        </React.Fragment>
    );
}

const mapStateToProps = (state: RootState) => {
    return {
        
    }
}

const mapDispatchToProps = {
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Template);
