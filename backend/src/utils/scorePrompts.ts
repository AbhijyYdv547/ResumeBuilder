interface ScoreProps{
    url:string
}

export const genScorePrompt = ({url}:ScoreProps) : string =>{

const result = 
`Give the github profile on the url: ${url} a score out of 10 basesd on User's enthusiasm, their OSS involvement and their codebase.
Remember to only give the score in the format : number
`

return result;
}


export const genAdvicePrompt = ({url}:ScoreProps):string =>{
    const result =
    `Give the github profile on the url: ${url} an advice on what they are lacking and what they can do to make their profile better in exactly 20 words`
    return result;
}