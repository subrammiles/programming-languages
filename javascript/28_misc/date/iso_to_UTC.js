

const isoToUTCYYYYMMDD=(isoDate)=>{
    const date=new Date(isoDate)
    const year =date.getUTCFullYear();
    let month =date.getUTCMonth()+1
    let dt=date.getUTCDate();
    dt=dt<10?`0${dt}`:dt
    month=month<10?`0${month}`:month

    return year+month+dt
}