import { Injectable } from '@angular/core';

@Injectable()
export class TargetService {
    getDatas(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(
                {
                'success': true,
                'data':[
                    {"number":"1","pNumber":"bxskshd1778","userName":"大头","telPhone":"1888888888","type":"汇车贷","money":"1000","date":"3个月","time":"2017-08-18 09:21:12","state":"意向终止"},
                    {"number":"1","pNumber":"bxskshd1778","userName":"大头","telPhone":"1888888888","type":"汇车贷","money":"1000","date":"3个月","time":"2017-08-18 09:21:12","state":"意向终止"},
                    {"number":"1","pNumber":"bxskshd1778","userName":"大头","telPhone":"1888888888","type":"汇车贷","money":"1000","date":"3个月","time":"2017-08-18 09:21:12","state":"意向终止"},
                    {"number":"1","pNumber":"bxskshd1778","userName":"大头","telPhone":"1888888888","type":"汇车贷","money":"1000","date":"3个月","time":"2017-08-18 09:21:12","state":"意向终止"},
                    {"number":"1","pNumber":"bxskshd1778","userName":"大头","telPhone":"1888888888","type":"汇车贷","money":"1000","date":"3个月","time":"2017-08-18 09:21:12","state":"意向终止"},
                    {"number":"1","pNumber":"bxskshd1778","userName":"大头","telPhone":"1888888888","type":"汇车贷","money":"1000","date":"3个月","time":"2017-08-18 09:21:12","state":"意向终止"},
                    {"number":"1","pNumber":"bxskshd1778","userName":"大头","telPhone":"1888888888","type":"汇车贷","money":"1000","date":"3个月","time":"2017-08-18 09:21:12","state":"意向终止"},
                ]
                } 
            )
        })
    }
}
