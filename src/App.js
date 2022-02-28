import React from 'react'
import style from './calculus.module.css'

class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      equation: "",
      history: [],
      historyButtons: [],
      loops: 0
    }
  }

  handleClick(char){
    switch(char){
      case '=':
        try {
          this.state.history.push(this.state.equation);
          this.createHistoryButton()
          this.setState({
            equation: eval(this.state.equation),
          })
          this.setState(prevState=>({
            loops: prevState.loops+1
          }))
        }
        catch(err) {
          this.setState({
            equation: "ERROR"
          }) 
          this.setState(prevState=>({
            loops: prevState.loops+1
          }))
        }
        break;
      case 'C':
        this.setState({
          equation: ""
        })
        break;
      case 'b':
        this.setState(prevState=>({
          equation: prevState.equation.slice(0, -1)
        }))
        break;
      default:
        this.setState(prevState=>({
          equation: prevState.equation += char
        }))
        break;
    }

    console.log(this.state.loops)
  }

  jumpToHistory(loops){
    console.log(this.state.history[loops])
    this.setState({
      equation: this.state.history[loops]
    })
  }

  createHistoryButton(){
    let saveLoop = this.state.loops
    this.state.historyButtons.push(<button onClick={()=>this.jumpToHistory(saveLoop)}>{this.state.equation}={eval(this.state.equation)}</button>)
  }

  genCalcu(){
    const cal = <div className={style.calcus}>
      <div className={style.row}>
        <button onClick={()=>this.handleClick('C')}>C</button>
        <button onClick={()=>this.handleClick('7')}>7</button>
        <button onClick={()=>this.handleClick('4')}>4</button>
        <button onClick={()=>this.handleClick('1')}>1</button>
        <button></button>
      </div>
      <div className={style.row}>
      <button onClick={()=>this.handleClick('b')}>&laquo;</button>
        <button onClick={()=>this.handleClick('8')}>8</button>
        <button onClick={()=>this.handleClick('5')}>5</button>
        <button onClick={()=>this.handleClick('2')}>2</button>
        <button onClick={()=>this.handleClick('0')}>0</button>
      </div>
      <div className={style.row}>
        <button onClick={()=>this.handleClick('%')}>%</button>
        <button onClick={()=>this.handleClick('9')}>9</button>
        <button onClick={()=>this.handleClick('6')}>6</button>
        <button onClick={()=>this.handleClick('3')}>3</button>
        <button onClick={()=>this.handleClick('.')}>.</button>
      </div>
      <div className={style.row}>
        <button onClick={()=>this.handleClick('/')}>/</button>
        <button onClick={()=>this.handleClick('*')}>*</button>
        <button onClick={()=>this.handleClick('-')}>-</button>
        <button onClick={()=>this.handleClick('+')}>+</button>
        <button onClick={()=>this.handleClick('=')}>=</button>
      </div>
    </div>
      
    return cal;
  }

  render(){
    return(<div className={style.contaier}>
      <div className={style.calculatorCon}>
        <div className={style.outWindow}>{this.state.equation}</div>
        {this.genCalcu()}
      </div>  
      <div className={style.history}>HISTORY{this.state.historyButtons.map((item,i)=><li key={i}>{item}</li>)}</div>
    </div>)
  }
}

export default App;
