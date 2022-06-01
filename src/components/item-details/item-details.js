import React, { Component } from 'react';

import './item-details.css';
import Spinner from '../spinner/spinner';
import ErrorButton from '../error-button';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{ item[field] }</span>
    </li>
  );
};

export {
  Record
};

export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null,
    loading: true,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId ||
        this.props.getData !== prevProps.getData ||
        this.props.getImageUrl !== prevProps.getImageUrl) {
      this.updateItem();
    }
  }

  updateItem() {
    const {itemId, getData, getImageUrl} = this.props;
    if (!itemId) return;

    getData(itemId)
        .then((item) => {
          this.setState({
            item,
            loading: false,
            image: getImageUrl(item)
          });
        })
  }

  render() {
    if (!this.state.item) {
      return <span>Select an item</span>
    };

    const {
      item , image, loading
    } = this.state;

    if (loading) {
      return <Spinner />;
    };

    return (
      <div className="person-details card">
        <img className="person-image"
          src={image} />

        <div className="card-body">
          <h4>{item.name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}
