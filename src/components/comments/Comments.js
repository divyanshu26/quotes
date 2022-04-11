import { useState, useEffect, useCallback } from 'react';

import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import {getAllComments} from '../../lib/api';
import CommentsList from './CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {sendRequest, data: allComments , error , status} = useHttp(getAllComments);
  
  console.log('comments',allComments,status);
  const params = useParams();
  const {quoteId} = params; 

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const getCommentsAfterAdd = useCallback(()=>{
    sendRequest(quoteId);
  },[quoteId,sendRequest]);

  useEffect(()=>{
    sendRequest(quoteId);
  },[quoteId, sendRequest]);
  let comments = null;
  if(error){
    comments = <p className='centered'> {error}</p>;
  };

  if(status === 'pending'){
    comments = <div className='centered'><LoadingSpinner/></div>;
  };

  if(status === 'completed' && allComments.length >0 && allComments ){
    comments = <CommentsList comments = {allComments}/>
  };

  if(status === 'completed' && (!allComments || allComments.length ===0)){
    comments = <p className='centered'>No comments on this post !!</p>
  }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} commentAdded={getCommentsAfterAdd}/>}
      <div>{comments}</div>
    </section>
  );
};

export default Comments;
