const moment = require('moment');

const paginate = ({ page, pageSize }) => {
    const offset = (parseInt(page) - 1)* pageSize;
    const limit = parseInt(pageSize);
  
    
    return {
      offset,
      limit,
    };
  };

  const pageCount = ({count, page, pageSize}) => {

    let pageTotal = Math.ceil(count / pageSize);
    let prevPage = null;
    let nextPage = null;

     if (page == pageTotal && page > 1){
        prevPage = parseInt(page) - 1;
        nextPage = null;
    }else if(page > 1){
      prevPage = parseInt(page) - 1;
      nextPage = parseInt(page) + 1;        
    }else if(page == 1 && pageTotal > 1){
      nextPage = 2;
    }

    return {
      prevPage,
      currentPage: parseInt(page),
      nextPage,
      pageTotal,
      pageSize: pageSize > count ? parseInt(count) : parseInt(pageSize)
    }
  }
  
  const referenceGenerator = () => {
    const time = moment().format('YYYY-MM-DD hh:mm:ss');
    const rand = Math.floor(Math.random() * Date.now())

    return `P1|${time.replace(/[\-]|[\s]|[\:]/g, '')}|${rand}`
  }

  const transactionGenus = {
    WALLET: "WALLET",
    MEMBERSHIP: "MEMBERSHIP",
    PURCHASE: "PURCHASE"
  }

  const transactionStatus = {
    STARTED: 'STARTED',
    INPROGRESS: 'IN-PROGRESS',
    COMPLETED: 'COMPLETED'
}

const transactionType = {
  CREDIT: "CREDIT",
  MEMBERSHIP: "MEMBERSHIP",
  DEBIT: "DEBIT"
}
  
  const helpers = {
      paginate,
      pageCount,
      referenceGenerator,
      transactionType,
      transactionStatus,
      transactionGenus
  }

  module.exports = helpers;