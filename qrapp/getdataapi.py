import requests
from requests_ntlm import HttpNtlmAuth

def getjs(sc, shop):
    username = r'WebService'
    password = 'web2018'
    # 789
    auth = HttpNtlmAuth(username, password)
    strParam = shop + '/' + sc
    list_url = r"https://ts.offprice.eu/service_retail/hs/wms_api/getpriceQR/" + strParam
    headers = {'Accept': 'application/json;odata=verbose'}
    responce = requests.get(list_url, verify=False, auth=auth, headers=headers)
    response_json = responce.json()
    return response_json