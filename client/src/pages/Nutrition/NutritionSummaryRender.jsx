import React, {useEffect, useState} from 'react';
import './nutrition.css';
import RenderSelectionButtons from './GoalSelectionParameter';

const convertInchesToCM = ( height ) => {
    let newHeight = height * 2.54;
    return newHeight;
}

const convertLbsToKg = ( weight ) => {
    let newWeight = weight / 2.205;
    return newWeight;
}

const getCorrectedUnits = ( heightData, weightData, ageData ) => {
    
    let newData = { height: null, weight: null };
    if( heightData.unit !== 'cm'){
        if( heightData.unit === 'inches'){
            newData.height = convertInchesToCM( heightData.amount );
        }
    }
    if( weightData.unit !== 'kg'){
        if( weightData.unit === 'lbs'){
            newData.weight = convertLbsToKg( weightData.amount );
        }
    }
    newData.age = ageData;

    return newData;
}

const getBmr = ( userMeasurement ) => {
    const bmr = (447.593 + (9.247 * userMeasurement.weight) + (3.098 * userMeasurement.height) - (4.330 * userMeasurement.age)).toFixed(0);
    return bmr;
}

const RenderNutitionSummaryCard = ( props ) => {

    const userWeightData = props.props.props.weight;
    const userHeightData = props.props.props.height;
    const userAgeData = props.props.props.age;

    const userMeasurement = getCorrectedUnits( userHeightData, userWeightData, userAgeData );
    const userBmr = getBmr( userMeasurement );

    return(
        <summaryContainer>
            <cardHeaderBottom>
                <cardTitle> Summary </cardTitle>
            </cardHeaderBottom>
            <summaryContent>
                <summarySection> 
                    <div>You have eaten </div> 
                    <userCalc> 1220 </userCalc>
                    <div> calories today </div>
                </summarySection>
                <summarySection>
                    <div> Your BMR is </div>
                    <userCalc> {userBmr} </userCalc>
                </summarySection>
                <summarySection>
                    <RenderSelectionButtons />
                </summarySection>
                <summarySection>
                    <userCalc> 2 </userCalc>
                    <div>pounds per week </div>
                </summarySection>
                <summarySection>
                    <div> Your calorie goal is </div>
                    <userCalc> 1200 </userCalc>
                    <div> calories per day </div>
                </summarySection>
                <summarySection>
                    <div> You have </div>
                    <userCalc> 108 </userCalc>
                    <div> calories remaining </div>
                </summarySection>
                <summarySection>
                    <div> Estimated weight in </div>
                    <userCalc> 5 </userCalc>
                    <div> weeks: </div>
                    <userCalc> 116 </userCalc>
                    <div> lbs </div>
                </summarySection>
            </summaryContent>
        </summaryContainer>
    )
}

export default RenderNutitionSummaryCard;