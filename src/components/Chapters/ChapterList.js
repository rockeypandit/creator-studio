import React from 'react';
import {connect} from 'react-redux';

import {fetchChapters, addChapter} from '../../actions';

import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import {Link} from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


const ChapterList = React.createClass({

    componentDidMount(){
        this.props.fetchChapters(this.props.subject)
    },

    render(){

      
        let body = this.props.chapters.isFetching ? 
            ( <p>Loading notes...</p> )
            :
            (   
                <div>
                    <FloatingActionButton mini={true} className="right" onClick={this.handleAddChapter}>
                        <ContentAdd />
                    </FloatingActionButton>
                    <h4 className="center">Chapters ( {this.props.chapters.list.length}  )</h4>
                    <p className="center red-text">{this.props.chapters.errorMessage}</p>
                    <div className="row">
                        {
                            this.props.chapters.list.map(chapter =>
                                <div className="col m3"  key={chapter.key}>
                                    <Link to={ `/chapters/${chapter.key}/`}>
                                        <Paper zDepth={1} className="chapter-card">
                                            <h5>{chapter.name}</h5>
                                        </Paper>
                                    </Link>
                                </div>
                            ) 

                        }
                    </div>
                    {this.props.children}
                </div>
            )

        return (
            <div className="section chapters">
                {body}
            </div>
        );
    },


    handleAddChapter(){
        let link = `/subjects/${this.props.subject}/chapters/add`;
        browserHistory.push(link)
    }
});

const mapStateToProps = ({chapters}, {params: {subject_key}}) => ({
    subject: subject_key,
    chapters
})

const mapDispatchToProps = dispatch => ({
    fetchChapters: subject_key => dispatch(fetchChapters(subject_key)),
    addChapter: data => dispatch(addChapter(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChapterList)