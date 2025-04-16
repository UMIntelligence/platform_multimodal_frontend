import axios from 'axios';
import httpsUrls from './requestURL'
import request from '../utils/interceptors'
// location.href = 'http://localhost:8089/'

// 登录请求方法
const loginreq = (method, url, params) => {
    return request({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'source': 'pc'
        },
        data: params,
        traditional: true
    }).then(res => {
        if(res.data.code == 20000) {
            // localStorage.setItem("isExpire", 0)
            return res.data;
            
        } else if(res.data.code == 40013) {
            
        } else {
            // localStorage.setItem("isExpire", 0)
            return res.data;
            
        }
    });
};

// 通用公用方法
const req = (method, url, params, source = 'pc') => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return request({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'authorization': userInfo ? userInfo.token : '',
            'role': userInfo ? userInfo.role : '',
            'source': source
        },
        data: params,
        traditional: true,
        transformRequest: [
            function(data) {
                let ret = ''
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ]
    }).then(res => {
        // res.data;
        if(res.data.code == 20000) {
            localStorage.setItem("isExpire", 0)
            return res.data;
        } else if(res.data.code == 40013) {
            // console.log(998)
            let isExpire = localStorage.getItem("isExpire");
            if(isExpire == 0) {
                localStorage.setItem("isExpire", 1)
                // location.href = 'http://localhost:8089/'
                let parentCode = localStorage.getItem('parent_user_code')
                let parentRole = localStorage.getItem('parent_user_role')
                if (parentCode != "null" && parentCode != null && parentCode != undefined && parentCode != "undefined" && parentRole != 'guess') {
                    location.href = httpsUrls.url + '#/index?parent_user_code=' + parentCode + '&role=' + parentRole
                } else {
                    location.href = httpsUrls.url
                }
            }
            // return res.data
            localStorage.setItem("userInfo", null)
            
        } else {
            localStorage.setItem("isExpire", 0)
            return res.data;
        }
    });
};

// 通用公用方法/无token
const picturess = (method, url, params) => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return request({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'authorization': userInfo ? userInfo.token : '',
            'role': userInfo ? userInfo.role : '',
            'source': 'pc'
        },
        data: params,
        traditional: true,
        transformRequest: [
            function(data) {
                let ret = ''
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ]
    }).then(res => {
        return res.data
    });
};

const jsonreq = (method, url, params) => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return request({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'authorization': userInfo ?userInfo.token:'',
            'role': userInfo ?userInfo.role:'',
            'source': 'pc'
        },
        data: params,
        traditional: true,
    }).then(res => {
        // res.data;
        if(res.data.code == 20000) {
            localStorage.setItem("isExpire", 0)
            return res.data;
        } else if(res.data.code == 40013) {
            // console.log(998)
            let isExpire = localStorage.getItem("isExpire");
            if(isExpire == 0) {
                localStorage.setItem("isExpire", 1)
                // location.href = 'http://localhost:8089/'
                let parentCode = localStorage.getItem('parent_user_code')
                let parentRole = localStorage.getItem('parent_user_role')
                if (parentCode != "null" && parentCode != null && parentCode != undefined && parentCode != "undefined" && parentRole != 'guess') {
                    location.href = httpsUrls.url + '#/index?parent_user_code=' + parentCode + '&role=' + parentRole
                } else {
                    location.href = httpsUrls.url
                }
            }
            localStorage.setItem("userInfo", null)
            
        } else {
            localStorage.setItem("isExpire", 0)
            return res.data;
        }
    });
};

export {
    loginreq,
    req,
    jsonreq,
    picturess
    // chatreq,
    // logoutreq
}