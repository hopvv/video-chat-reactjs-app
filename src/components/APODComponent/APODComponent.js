import React from "react";
import { connect } from 'react-redux';

import {TIME_CHANGE_SLIDE_APOD} from "../../constants/config";

import {
  Carousel
} from 'react-bootstrap';

import {getAPODs} from "../../actions";
import keyOfTheDayReducer from "../../reducers/keyOfTheDayReducer";
import "./styles.scss";

class APODComponent extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAPODs();
  }
  
  render() {
    const {
      keyOfTheDayReducer
    } = this.props;

    const items = Object.keys(keyOfTheDayReducer); //We using Object.keys to get exactly order of KEY
    return (
      <section className="APOD">
        <Carousel
          interval={TIME_CHANGE_SLIDE_APOD}
        >
          {items.length > 0 && items.map((date, index) => {
            const item = keyOfTheDayReducer[date];
            return (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={item.url}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3 className="APOD__title">{item.title + " - " + item.date}</h3>
                  <p className="APOD__explanation">{item.explanation}</p>
                  <p className="APOD__copy-right">{item.copyRight}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </section>
    );
  }
}

export default connect(
  state => ({ keyOfTheDayReducer: state.keyOfTheDayReducer }),
  { getAPODs },
)(APODComponent)