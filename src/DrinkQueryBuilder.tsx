import React from 'react';
import Button from '@material-ui/core/Button';
import ListItem from './DrinkQueryBuilderItem';

type DrinkQueryItem = {
    id: number,
    priority: string,
    type: string,
    name?: string
}
type DrinkQueryBuilderState = {
    queryItems: DrinkQueryItem[]
}

class DrinkQueryBuilder extends React.Component<{}, DrinkQueryBuilderState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            queryItems: [{ id: 1, priority: "REQUIRED", type: "LIQUOR", name: "" }]
        };
    }

    updateItem(item: DrinkQueryItem) {
        const newQueryItems = this.state.queryItems;
        const queryItemIndex = this.state.queryItems.findIndex(queryItem => item.id === queryItem.id);
        if (~queryItemIndex) {
            newQueryItems[queryItemIndex] = item;
            this.setState({ ...this.state, queryItems: newQueryItems });
        }
    }

    render() {
        return (
            <form noValidate autoComplete="off">
                {this.state.queryItems.map((queryItem, queryItemIndex) =>
                    <ListItem key={`query-builder-list-item-${queryItemIndex}`} queryItem={queryItem} updateItem={this.updateItem.bind(this)} />
                )}
                <Button variant="contained" color="primary" onClick={(event) => {
                    this.setState({
                        queryItems: [...this.state.queryItems, { id: this.state.queryItems.length, priority: "REQUIRED", type: "LIQUOR", name: "" }]
                    });
                }}>
                    Add
                </Button>
                <Button variant="contained" color="primary">
                    Search
                </Button>
            </form >
        )
    }
}

export default DrinkQueryBuilder;