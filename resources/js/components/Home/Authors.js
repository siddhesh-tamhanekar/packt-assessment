import React from 'react'

function Authors({ authors }) {
    return (
        <div className=''>
            By &nbsp;
            {authors.length > 0 && authors.map(author => {
                return <span className='mr-2' title={author.about.replace(/(<([^>]+)>)/ig, '')}>{author.name}</span>
            })}
        </div>
    )
}

export default Authors