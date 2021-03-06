import React from 'react';
import Button from '@material-ui/core/Button';
import backBackApi from '../services/barBackApi';
import NewItem from './NewItem';
import QueryItem from './QueryItem';
import Product from '../types/Product';

export type DrinkQueryItem = {
    priority: string,
    item: Product
}
type DrinkQueryBuilderState = {
    productList: Product[],
    productListReady: boolean,
    queryItems: DrinkQueryItem[]
}

class DrinkQueryBuilder extends React.Component<{}, DrinkQueryBuilderState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            productListReady: false,
            productList: [],
            queryItems: []
        };
    }

    componentDidMount() {
        backBackApi.get(`/products`)
            .then(res => {
                console.log(res);
                this.setState({ ...this.state, productListReady: true, productList: res.data });
            })
    }

    updateItem(item: DrinkQueryItem) {
        const newQueryItems = this.state.queryItems;
        const queryItemIndex = this.state.queryItems.findIndex(queryItem => item.item.id === queryItem.item.id);
        if (~queryItemIndex) {
            newQueryItems[queryItemIndex] = { ...item };
            this.setState({ ...this.state, queryItems: newQueryItems });
        }
    }

    addItem(item: DrinkQueryItem) {
        console.log("ADD ITEM", item);
        const newQueryItems = this.state.queryItems;
        newQueryItems.push({ ...item });
        this.setState({ ...this.state, queryItems: newQueryItems });
    }

    render() {
        return (
            <form noValidate autoComplete="off">
                {this.state.queryItems.map((queryItem, queryItemIndex) =>
                    <QueryItem key={`query-builder-list-item-${queryItemIndex}`} queryItem={queryItem} updateItem={this.updateItem.bind(this)} />
                )}
                {this.state.productListReady &&
                    <NewItem options={this.state.productList} addItem={this.addItem.bind(this)} />
                }
                {/* <Button variant="contained" color="primary" onClick={(event) => {
                    this.setState({
                        queryItems: [...this.state.queryItems, { id: this.state.queryItems.length, priority: "REQUIRED", name: "" }]
                    });
                }}>
                    Add
                </Button> */}
                <Button variant="contained" color="primary">
                    Search
                </Button>
            </form >
        )
    }
}

export default DrinkQueryBuilder;