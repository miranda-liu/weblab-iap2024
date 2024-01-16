import React, {useState} from 'react' // import React library

// this component is function that takes in props as input, returns what you want tor
// render as output
const CommentReply = (props) => {
    // function logic (JavaScript)
    
    // React state syntax
    const [isLiked, setIsLiked] = useState(false)
    // useState returns two vals: state = isLiked and state setter = setIsLiked
    // state initially set to false
    // setIsLiked(true) sets isLiked to true

    return (
        // what you want to render (JSX) with React component -> jsx is similar to html
        <div className="comment-text">
            <h5>{props.name}</h5>
            <p>{props.content}</p>
            <p>{isLiked ? "Liked" : "Like"}</p> {/*conditional statement in JS */}
        </div>
        )
    // () allows us to write JSX code inside JS
    // {} allows to use JS variables defined inside this React component
}

export default CommentReply