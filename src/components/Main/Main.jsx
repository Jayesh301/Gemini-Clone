import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { context } from '../../context/Context'

const Main = () => {
  const { input, setInput, onSent, recentPrompt, showResults, loading, resultData } = useContext(context);

  
  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini(Better)</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">


            {!showResults 
            ?<> 
            <div className="greet">
                <p><span>Hello BKL</span></p>
                <p>Kya haal hai</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>What is React </p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly explain React </p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>What is React JS </p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>What is Express JS </p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>
            :<div className="result">
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ?<div className = "loader" >
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                    
                </div>
            </div>
            }

            
            
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value = {input} type="text" placeholder='Likh le bhai' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <p className="bottom-info">
                    Galat ho Sakta hai 👍
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main