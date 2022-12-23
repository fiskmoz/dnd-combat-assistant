# Dnd Combat Assistant

Generate balanced encounters for your party given parameters e.g, number of players or monsters, general location, encounter difficulty etc.  
Now also featuring a fully integrated initiative generator where you can dynamically sort, add or remove monsters.

### Backlog:

Fix high level encounter matching  
Favicons  
Integrate damage calculations in initiative generator  
Sea only creatures still show up with land, sometimes?  
More monsters, more images.
Consistent error responses with consistent entity  
Write better firestore rules

### The Stack:

Flask + Angular 9

### Getting started localhost:

Install python 3  
`pip install flask`  
Navigate to project root  
`python app.py`

navigate to front-end map:  
`export NODE_OPTIONS=--openssl-legacy-provider`  
`npm i`  
`npm start`  
or  
`ng serve --proxy-config proxy.config.json`

Create a firebase_creds.json with the following structure in the back-end map:

```
{
  "type": "---",
  "project_id": "---",
  "private_key_id": "---",
  "private_key": "---",
  "client_email": "---",
  "client_id": "---",
  "auth_uri": "---",
  "token_uri": "---",
  "auth_provider_x509_cert_url": "---",
  "client_x509_cert_url": "---"
}

```

## Gettings started python specific

### vscode extensions
Python   
Pylint

Start venv in terminal (bash)
```
cd back-end
py -m venv venv
source venv/Scripts/activate
```
Installing requirements and deactivating
```
pip i -r ../requirements.txt
deactivate
```

If vscode fails to lint etc, select the virtual environment as the interpreter
```
ctrl+shift+p
python select interpreter
venv/Scripts/python  
```
To enable vscode formatting add this to user settings JSON
```
"python.formatting.autopep8Args": ["--max-line-length", "120", "--experimental"],
```

Update requirements

```
pip install pip-upgrader
```

```
pip-upgrade
```