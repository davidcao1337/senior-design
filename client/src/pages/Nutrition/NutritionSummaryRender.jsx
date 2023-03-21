import React, {useEffect, useState} from 'react';
import './nutrition.css';
import RenderSelectionButtons from './GoalSelectionParameter';
import Select from 'react-select'

const getBmr = ( weight, height, age ) => {
    const bmr = (447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)).toFixed(0);
    return bmr;
}

const RenderNutitionSummaryCard = ( props ) => {

    // get total calories eaten
    const totalCaloriesEaten = props.props.userProps.cals;
    const userWeightGoal = props.props.userProps.weightGoal;
    const userWeightData = props.props.userProps.weight;
    const userHeightData = props.props.userProps.height;
    const userAgeData = props.props.userProps.age;
    var userBmr = ''
    var userCalorieGoal = props.props.userProps.calorieGoal

    if ( userWeightData != 'N/A' && userHeightData != 'N/A' && userAgeData != 'N/A' ){
        userBmr = getBmr( userWeightData, userHeightData, userAgeData );
    }

    const [goalType, setGoalType] = useState("")
    const [lbsType, setLbsType] = useState("")

    const goalOptions = [
        { value: "lose", label: "Lose" },
        { value: "maintain", label: "Maintain" },
        { value: "gain", label: "Gain" }
    ]

    const lbsOptions = [
        { value: 0, label: "0" },
        { value: 1, label: "1" },
        { value: 2, label: "2" }
    ]

    const handleGoalSelect = (selectedOption) => {
        setGoalType(selectedOption.value)
    }

    const handleLbsSelect = (selectedOption) => {
        setLbsType(selectedOption.value)
    }

    const calculateGoal = ( goalType, lbsType ) => {
        var calculatedGoal
        if( !goalType ){
            userCalorieGoal = 'select a goalType'
        }
        if( goalType === 'maintain' ){
            calculatedGoal = ( userBmr * 1.15)
            userCalorieGoal = calculatedGoal.toFixed(0) 
        }
        if( goalType === 'lose' ){
            if( !lbsType ){
                userCalorieGoal = 'select a lbs amount' 
            }
            calculatedGoal = ( userBmr * 1.15) - (lbsType * 500 )
            userCalorieGoal = calculatedGoal.toFixed(0) 
        }
        if( goalType === 'gain' ){
            if( !lbsType ){
                userCalorieGoal = 'select a lbs amount' 
            }
            calculatedGoal = ( userBmr * 1.15) + (lbsType * 500 )
            userCalorieGoal = calculatedGoal.toFixed(0) 
        }
        return userCalorieGoal
    }

    return(
        <summaryContainer>
            <cardHeaderBottom>
                <cardTitle> Summary </cardTitle>
            </cardHeaderBottom>
            <summaryContent>
                <summarySection> 
                    <div>You have eaten </div> 
                    <userCalc> {totalCaloriesEaten} </userCalc>
                    <div> calories today </div>
                </summarySection>
                <summarySection>
                    <div> Your BMR is </div>
                    <userCalc> {userBmr} </userCalc>
                </summarySection>
                <summarySection>
                    <div className='goalSelect'>
                        <div className='goalHeader'> Current Goal </div>
                        <Select 
                            className="mb-6"
                            id="goalType" 
                            options={goalOptions} 
                            onChange={handleGoalSelect} 
                        />
                    </div>
                </summarySection>
                <summarySection>
                    <Select 
                        className="mb-6"
                        id="lbsGoal" 
                        options={lbsOptions} 
                        onChange={handleLbsSelect} 
                    />
                    <div>pounds per week </div>
                </summarySection>
                <summarySection>
                    <div> Your calorie goal is </div>
                    <userCalc> {calculateGoal(goalType, lbsType)} </userCalc>
                    <div> calories per day </div>
                </summarySection>
                <summarySection>
                    <div> You have </div>
                    <userCalc> {(calculateGoal(goalType, lbsType) - totalCaloriesEaten) || 'select options'} </userCalc>
                    <div> calories remaining </div>
                </summarySection>
            </summaryContent>
        </summaryContainer>
    )
}

export default RenderNutitionSummaryCard;
