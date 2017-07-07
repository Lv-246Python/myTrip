# myTrip

Global installs for Ubuntu

install git:
```bash
sudo apt-get install git
```

install pyenv:
```bash
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
```

pyenv dependencies:
```bash
apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev xz-utils tk-dev
```

install python:
```bash
pyenv install 3.6.1
```
Install Configuration of project

Clone repository:
```bash
git clone https://github.com/Lv-246Python/myTrip.git
```

install local Python version 3.6.1 by Pyenv console command :
```bash
pyenv local 3.6.1
```

install virtual environment by console command:
```bash
virtualenv venv
```

activate virtualenv by console command:
```bash
source venv/bin/activate
```

install packages by pip console command:
```bash
pip install -r requirements.txt
```

create local_settings.py

create your local database with your superuser:
in local_settings add connections to db

create file local_settings.py with property ```DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'your_bd_name',
        'USER': 'user_name',
        'PASSWORD': 'user_password',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}```
Running server
run local server in terminal by console command: “python manage.py runserver”


## Other
* Code Convention. For analyzing and establishing clean code (according to PEP8) we use **pylint**.
In addition since project uses Django **pylint_django** plugin for pylint is used. All pylint
configurations are in **.pylintrc** config file. To check specific  file or package use:

    ```sh
    pylint --rcfile=/path/.pylintrc filename.py
    ```
    Additional information: [Pylint User Manual](https://pylint.readthedocs.io/en/latest/)

## Webpack
* For installing new packages in terminal type:
    ```sh
    npm install
    ```
    
* To run webpack you should be in the directory where webpack.config.js is located and type:
    ```sh
    ./node_modules/webpack/bin/webpack
    ```
