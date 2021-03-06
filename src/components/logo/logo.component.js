import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {gsap, Power3, TimelineMax} from 'gsap';

const LogoLayout = styled.div`
    
    padding-left: 5px;
    padding-right: 5px;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    font-style: italic;
    border-radius: 15px;
    /* width: 65px; */

    display: grid;
    grid-template-columns: repeat(16, 5px);
    grid-template-rows: repeat(13, 5px);

    .squaredFilled{
        background-color: #c62ff7;
        width: 80%;
        height: 100%;
    }   
    .squaredEmpty{
        background-color: transparent;
        width: 80%;
        height: 100%;
    }   
`;

const Logo = ({}) => {

    const doesntApply = [
        [0, 6, 7, 8, 9],
        [0, 2, 3, 4, 5, 8, 11, 12, 13, 14, ],
        [0, 2, 3, 4, 5, 6, 8, 10, 11, 12, 13, 14],
        [0, 2, 6, 7, 9, 10, 11],
        [0, 2, 6, 7, 9, 10, 11, 13, 14, 15],
        [0, 2, 6, 7, 9, 10, 11, 12, 14, 15], 
        [0, 2, 3, 4, 5, 6, 10, 11, 12, 13, 15],
        [0, 2, 3, 4, 5, 11, 12, 13, 14],
        [0, 2, 3, 12, 13, 14],
        [2, 3, 12, 13, 14],
        [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13],
        [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 15],
        [0, 14, 15],
    ]

    let squaresArray = [];
    // let checkShouldStop = useState(false);
    // const [checkShouldStop, setCheckShouldStop] = useState(false);
    
    let [shouldStop, setShouldStop] = useState(false);

    // let [tl, setTl] = useState(new TimelineMax());
    // function checkShouldStop() {
    //     if(shouldStop) {
    //         tl.pause();
    //     }else {
    //         tl.resume();
    //     }
    // }
    let timeLines = [];
    let timeLinesGrow = [];
    

    useEffect(() => {
        
        squaresArray.map((square, index) => {
            let tl = new TimelineMax();
            let tl2 = new TimelineMax();
            console.log(square);
            let value2 = Math.random() * 2
            tl.to(square, 1.9, {x: (index%2 == 0 ? `+=${value2}` : `-=${value2}`), y: (index%2 == 0 ? `+=${value2}` : `-=${value2}`), z: (index%2 == 0 ? `+=${value2}` : `-=${value2}`), repeat: -1, yoyo: true});
            // tl.to(square, 0.7, {x: (index%2 == 0 ? `-=${value2}` : `+=${value2}`), y: (index%2 == 0 ? `-=${value2}` : `+=${value2}`), z: (index%2 == 0 ? `+=${value2}` : `-=${value2}`), repeat: -1, yoyo: true  });
            // tl.to(square, 0.9, {y: (index%2 == 0 ? `+=${value2}` : `-=${value2}`), yoyo:true, repeat:-1, });
            // tl.to(square, 0.9, {y: (index%2 == 0 ? `-=${value2}` : `+=${value2}`), yoyo:true, repeat:-1, });

            tl2.fromTo(square, 1.1, {width: `80%`,x: `0`, y: `0`}, {width: `100%`,x: `0`, y: `0`, ease: Power3.easeOut});
            tl2.pause();
            timeLines.push(tl);
            timeLinesGrow.push(tl2);
                    
        })
    })

    const stopAndGrow = () => {
        
        timeLines.map((timeline) => timeline.pause()); //stop normal behavior
        timeLinesGrow.map((timeline) => timeline.restart()); //grow 
        
    }

    const goOn = () => {
        
        timeLinesGrow.map((timeline) => timeline.pause()); //stop growing
        timeLines.map((timeline) => timeline.resume()); // start normal behavior
        
    }
    

    return(
        <LogoLayout onMouseEnter={() => {stopAndGrow()}} onMouseLeave={() => {goOn()}}>
        { 
            doesntApply.map((array, index) => {
                let squares = [];
                for(let j=0; j<16; j++){
                    squares.push(!doesntApply[index].includes(j) ? 
                        <div className="squaredFilled" ref={element => squaresArray.push(element)} > </div> : 
                        <div className="squaredEmpty" ref={element => squaresArray.push(element)}> </div>);
                }
                return squares;
            })
        }
        </LogoLayout>
    )
} 

export default Logo;