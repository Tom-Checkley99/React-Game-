import React, { Component } from "react";                                           // importing React componets from "react"
import Sketch from "react-p5";                                                      // importing Sketch from "reat p-5"
import PubNub from 'pubnub';                                                        // imoprting Pubnub from "pubnub"
import './App.css';                                                                 // importing "App.css"
export default class App extends Component {                                        // calling class called "App" and exporting all componets

  constructor() {                                                                   // opening contructor
    super();                                                                        // calling "super" function

    this.xBall = Math.floor(Math.random() * 300) + 50;                              // decalring this.xBall speed
    this.yBall = 50;                                                                // declaring this.yBall is 50
    this.xSpeed = (2, 7);                                                           // stating this.xSpeed starts a x value 2 and y value 7
    this.ySpeed = (-7, -2);                                                         // stating this.ySpeed starts a x value -7 and y value -2
    this.score = 0                                                                  // stateing this.score is 0
    this.start = 150;                                                               // stateing this.start is 150
    this.backgroundImage = "";                                                      // defining this.backgroundImage = ""
    this.ballImage = "";                                                            // defining this.ballImage = ""
    this.paddleImage = "";                                                          // defining this.paddleImage = ""

    this.pubnub = new PubNub({                                                      // calling this.pubnub to "new Pubnub"
        publishKey: 'pub-c-3c27741a-6520-44bc-a0dc-458f1fa5d19e',                   // giving Pubnub specifc publihsing key
        subscribeKey: 'sub-c-d0567ae6-cf2f-11ea-b0f5-2a188b98e439'                  // giving Pubnub specifc subscribing key
      });
      this.pubnub.subscribe({                                                       // telling Pubnub to subsribe
          channels: ['IOE_channel']                                                 // Pubnub is listening at channel "IOE_channel"
      });
      this.pubnub.addListener({                                                     // calling this.pubnub.addListener
         message: messageEvent => {                                                 // giving a message to messageEvent
         if(messageEvent.message.button == "player1_L") {                           // if statement saying, if messageEvent to message to button is "player1_L"
           this.start -= 10;                                                        // this.start -=25; (move left at a rate of -=25)
         }
           if(messageEvent.message.button == "player1_R") {                         // if statement saying, if messageEvent to message to button is "player1_R"
           this.start += 10;                                                        // this.start -=25; (move left at a rate of -=25)
         }
      }
  })

}                                                                                   // closing constructor function


  setup = (p5, canvasParentRef) => {                                                // creating setup function for p5, cavnasParentRef

    p5.createCanvas(400, 400).parent(canvasParentRef);                              // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    this.backgroundImage = p5.loadImage("./assets/background.png");                 // when this.backgroundImage is called - p5 to load in background.png from assets folder
    this.ballImage = p5.loadImage("./assets/ball.png");                             // when this.ballImage is called - p5 to load in ball.png from assets folder
    this.paddleImage = p5.loadImage("./assets/paddle.png")                          // when this.paddleImage is called - p5 to load in paddle.png from assets folder
};                                                                                  // closing setup function


  draw = p5 => {                                                                    // opening draw function with p5


     p5.image(this.backgroundImage, 0, 0,400,400);                                  // calling p5image this.backgroundImage
     p5.image(this.ballImage, this.xBall - 10, this.yBall - 10, 20, 20);            // calling p5image this.ballImage
     p5.image(this.paddleImage, this.start, 375, 90, 15);                           // calling p5imgae this.paddleImage


     this.move();                                                                   // calling this.move function
     this.bounce();                                                                 // calling this.bounce funciton
     this.paddle(p5);                                                               // calling this.paddle funciton


      p5.fill('black');                                                             // giving fill colour 'black' to score
      p5.textSize(24);                                                              // giving p5 text a size of 24
      p5.text("Score: " + this.score, 10, 25);                                      // giving the p5 text a name of "Score:"
}                                                                                   // closing draw function


  move()    {                                                                       // opening move function
      this.xBall += this.xSpeed;                                                    // this.xBall moves at a plus and equal rate to this.xSpeed
      this.yBall += this.ySpeed;                                                    // this.yBall moves at a plus and equal rate to this.ySpeed
}                                                                                   // closing move function

  bounce()  {                                                                       // opening bounce function
      if (this.xBall < 10 ||                                                        // if this.xBall is less than 10
        this.xBall > 400 - 10) {                                                    // this.xBall is more than 400 - 10
        this.xSpeed *= -1;                                                          // this.xSpeed multiplied and equal to -1
      }
      if (this.yBall < 10 ||                                                        // if this.yBall is less that 10
        this.yBall > 400 - 10) {                                                    // this.yBall is more than 400 - 10
        this.ySpeed *= -1;                                                          // this.ySpeed mulitpled and equal to -1
      }
}                                                                                   // closing bounce function


  paddle(p5) {                                                                      // opening paddle function with p5
       if ((this.xBall > this.start &&                                              // if this.xBall is more than this.start
         this.xBall < this.start + 90) &&                                           // this.xBall is less than this.start +90
         (this.yBall + 10 >= 375)) {                                                // this,yBall + 10 is bigger or equal to 375
          this.xSpeed *= -1;                                                        // this.xSpeed multiplied or equal to -1
          this.ySpeed *= -1;                                                        // this.ySpeed multiplied or equal to -1
          this.score++;                                                             // this.score plus plus
    }
}                                                                                   // closing paddle function


  render() {                                                                        // opening reder function

      return (                                                                      // opeing return
          <div className="App">                                                     
          <h1> EDUCATE-GAME </h1>
          <Sketch setup={this.setup} draw={this.draw} />
          <h2>OBJECTIVE</h2>
          <p> 1) Bounce the ball off the paddle to score points. </p>
          <p> 2) Failing to hit the ball will result in 0 points scored. </p>
          <p> 3) Answer questions correctly when promoted to score points. </p>
          <p> 4) Play for your high score. </p>
        </div>                                                                      // closing div tag

      );                                                                            // closing return tag
    }                                                                               // closing render tag

}                                                                                   // exporting class "App" and all components
