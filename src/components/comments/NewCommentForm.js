import { useRef , useEffect} from 'react';

import classes from './NewCommentForm.module.css';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const {sendRequest,status,data} = useHttp(addComment);
  //console.log('commentform',data,status);



  const submitFormHandler = (event) => {
    event.preventDefault();
    let comment = commentTextRef.current.value.trim();

    if(comment){
      //console.log(comment);
      sendRequest({commentData : comment, quoteId: props.quoteId});
    }
    // optional: Could validate here

    // send comment to server
  };

  useEffect(()=>{
    if(status === 'completed'){
      props.commentAdded();
      commentTextRef.current.value = '';
    }
  },[status]);

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} >
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
