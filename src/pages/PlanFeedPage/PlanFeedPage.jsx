import React, { useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {PlanFeed} from '../../components/Plan';
import { connect } from 'react-redux';
import {planActions} from '../../actions';
import { history } from '../../utilities';
import { planConstants } from "../../constants";


class PlanFeedPage extends React.Component{
    constructor(props) {
        super(props);
        this.handleSelectPlan = this.handleSelectPlan.bind(this);
        
        this.state = { plans: this.props.plan.plans};
        let user_email = JSON.parse(localStorage.getItem("user"))?.email;
        this.props.getPlans(user_email);
    }

    componentWillMount() {
        console.log('componentWillMount', this.props.plan.plans);
        this.setState(prevState=>
            ({...prevState, plans: this.props.plan.plans}));
    }

    componentDidUpdate()
    {
        console.log('componentDidUpdate', this.props.plan.plans);
    }

    handleSelectPlan(e)
    {
        // console.log('handleSelectPlan', e.target, e.currentTarget, e.currentTarget.id);
        // if(e.target !== e.currentTarget) return;
        this.props.selectPlan(e.currentTarget.id);
        history.push("/updatePlan");
        history.go(0);
        // setTimeout(()=> {
        //     history.push("/updatePlan");
        //     history.go(0);
        // }, 7000);
        
    };

    render() {
        var THIS = this;
        return (
            <Container maxWidth="80vw">
            {
                this.props.plan.plans.map(p=> 
                    (<div id={p.plan_id} key={p.plan_id+"_div"} onClick={THIS.handleSelectPlan} >
                        <PlanFeed key={p.plan_id} plan={p} />
                    </div>)
                )
            }
        </Container>
        )
    }
};

function mapState(state) {
    console.log('mapState', state);
    return {plan: state.plan};
}
const actionCreators = {
    selectPlan: planActions.selectPlan,
    getPlans: planActions.getPlans
};

const connectedRoomComponent = connect(mapState, actionCreators)(PlanFeedPage);
export { connectedRoomComponent as PlanFeedPage };