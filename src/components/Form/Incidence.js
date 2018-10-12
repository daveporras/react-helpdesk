import React, { Component } from 'react';
import Button from '../Button/Button';
import Text from '../Input/Text';
import './Incidence.css';

class Incidence extends Component {
  state = {
    subject: null,
    description: null
  }
  inputHandler = (event) => {
    const { value, type } = event.target;
    switch (type) {
      case 'text':
        this.setState({
          subject: value
        });
        break;
      case 'textarea':
        this.setState({
          description: value
        });
        break;
      default:
      break;
    }
  }
  sendIncidence = () => {
    console.log(this.state)
  }
  clearInputs = () => {
    this.setState({
      subject: null,
      description: null
    });
    console.log(this.state)
  }
  render () {
    return (
      <>
        <section className="modal-card-body">
          <Text label='Asunto:' className="incidence--label" onChange={event => this.inputHandler(event)} placeholder='Asunto de la incidencia' />
          <div className="field">
            <label className="label incidence--label">Detalle:</label>
            <textarea cols="30" rows="10" className="textarea" placeholder="Comente de manera detallada la incidencia" onChange={event => this.inputHandler(event)} ></textarea>
          </div>
        </section>
        <footer className="modal-card-foot">
          <Button onClick={this.sendIncidence} value="Enviar Incidencia" />
        </footer>
      </>
    )
  }
}

export default Incidence;