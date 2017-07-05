# myTrip

Global installs for Ubuntu

install git:
"sudo apt-get install git"

install pyenv:
"git clone https://github.com/pyenv/pyenv.git ~/.pyenv"
"echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc"
"echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc"
"echo 'eval "$(pyenv init -)"' >> ~/.bashrc"

pyenv dependencies:

"apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev xz-utils tk-dev"

install python:
"pyenv install 3.6.1"



install Configuration of project

Clone repository:
"git clone https://github.com/Lv-246Python/myTrip.git"

install local Python version 3.6.1 by Pyenv console command :
“pyenv local 3.6.1”

install virtual environment by console command:
“virtualenv venv”

activate virtualenv by console command:
“source venv/bin/activate”

install packages by pip console command:
“pip install -r requirements.txt”

create local_settings.py

create your local database with your superuser:
in local_settings add connections to db

create file local_settings.py with property “DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'your_bd_name',
        'USER': 'user_name',
        'PASSWORD': 'user_password',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}”
Running server
run local server in terminal by console command: “python manage.py runserver”

pyenv install:

git clone https://github.com/pyenv/pyenv.git ~/.pyenv
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc

pyenv dependencies:

'apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev xz-utils tk-dev'

