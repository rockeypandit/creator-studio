import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {fetchConcepts} from '../../actions';

import ConceptPreview from './ConceptPreview';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const ConceptList = React.createClass({

    componentWillMount(){
        this.props.fetchConcepts(this.props.chapter_key)
    },

    render(){
        return (
            <div>
                {
                    this.props.concepts.isFetching ? 
                    (
                        <p>Loading concepts...</p>
                    )
                    :
                    (   
                        <div>
                            <Link to={`/chapters/${this.props.chapter_key}/new`}>
                                <FloatingActionButton mini={true} className="right">
                                    <ContentAdd />
                                </FloatingActionButton>
                            </Link>
                            <h4>Concepts in {this.props.concepts.chapter.name}</h4>
                            <p className="red-text">{this.props.concepts.errorMessage}</p>
                            <div className="row">
                                { 
                                    this.props.concepts.list.map( concept => 
                                        <div className="col m3" key={concept.key}>
                                            <ConceptPreview concept={concept}/>
                                        </div>   
                                    )    
                                }
                            </div>
                        </div>
                    )
                }
                             
            </div>
        );
    }
})



const mapStateToProps = ({concepts}, {params: {chapter_key} }) => ({
    concepts,
    chapter_key
})

const mapDispatchToProps = dispatch => ({
    fetchConcepts: chapter_key => dispatch(fetchConcepts(chapter_key))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConceptList)