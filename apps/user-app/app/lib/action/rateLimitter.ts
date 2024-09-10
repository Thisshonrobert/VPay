
const idToRequestCount = new Map<string, number>();

const rateLimit = {
    windowStart: Date.now(),
    windowSize: 60 * 60 * 1000, //10mins
    maxReqCount:4
}

export const rateLimitter = (ip:string):boolean=>{
    const currentTime =  Date.now();
    const isNewWindow= currentTime - rateLimit.windowStart >rateLimit.windowSize;
    if(isNewWindow){
        rateLimit.windowStart=currentTime;
        idToRequestCount.set(ip,0)
    }

    const currentRequestCount = idToRequestCount.get(ip) ?? 0;
    if(currentRequestCount > rateLimit.maxReqCount) return true;
    idToRequestCount.set(ip,currentRequestCount+1)
    return false;

}

