import base64
import io

from PIL import Image
from pyzbar.pyzbar import decode
from requests_ntlm import HttpNtlmAuth
import requests

def get_js(sc, shop):

    username = r'WebService'
    password = 'web2018'
    auth = HttpNtlmAuth(username, password)
    strParam = shop + '/' + sc
    list_url = r"https://ts.offprice.eu/service_retail/hs/wms_api/getpriceQR/" + strParam
    headers = {'Accept': 'application/json;odata=verbose'}
    responce = requests.get(list_url, verify=False, auth=auth, headers=headers)
    response_json = responce.json()
    return response_json


def decode_barcode(my_image):
    # decodes all barcodes from an my_image
    # bar_class = barcode.ean.EAN13.name
    decoded_objects = decode(Image.open(my_image))
    # print(decoded_objects)
    for obj in decoded_objects:
        # draw the barcode
        # if obj.type == bar_class.replace("-", ""):
            # my_image = draw_barcode(obj, my_image)
            # print barcode type & data
            # print("Type:", obj.type)
        # print("Data:", obj.data.decode("utf-8"))
        return obj.data.decode("utf-8")
    return 0


def use_barcode(my_image):
    decoded_objects = decode_barcode(my_image)
    return decoded_objects


def use_barcode_ajax(my_image):
    decoded_objects = decode_barcode(my_image)
    return decoded_objects

def get_my_code(image_base64, shop):
    imgdata = base64.b64decode(str(image_base64))
    tempimg = io.BytesIO(imgdata)

    datasacan = use_barcode(tempimg)
    if datasacan == 0:
        return 0
    textbar = datasacan

    textjson = get_js(textbar, shop)
    # Надо чтобы возвращал штрихкод, если не удалось получить по нему данные
    if textjson == '[] []':
        return 1
    # get string with all double quotes
    single_quoted_dict_in_string = textjson
    desired_double_quoted_dict = str(single_quoted_dict_in_string)
    desired_double_quoted_dict = desired_double_quoted_dict.replace("'", "\"")
    return desired_double_quoted_dict


