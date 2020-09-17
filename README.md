# Acesso automático a parque estacionamento automóvel

Neste repositório encontra-se o desenvolvimento de uma aplicação que permite o acesso automático a um parque automóvel e também a sua interação com o mesmo.

### Arquitetura

![Arquitetura de software](https://github.com/jdro10/ESTG-Projeto-Final/blob/master/docs/img/software%20architecture.png)

### Estrutura do projeto

```
├── plate_detection              # Pasta que contém o programa de deteção de matrículas
│   ├── detection_algorithm
│   │   ├── alpr_exception.py    # OpenALPR exceção
│   │   ├── menu.py              # Menu do programa
│   │   ├── park_access.py       # Semáforo visual
│   │   ├── plate_detection.py   # Algoritmo deteção de matrículas
│   │   └── socket_stream.py     # Stream de imagens
│   └── openalpr_tests
│       └── openalpr_tests       # Teste biblioteca OpenALPR
├── server                       # Servidor
│   ├── bin
│   ├── config                   # Configuração da base de dados e autenticação
│   ├── controllers              # Controladores do projeto (utilizadores, base de dados, AMQP)
│   ├── routes                   # Endpoints da REST API
│   ├── app.js
│   ├── package-lock.json
│   └── package.json
├── webapp                       # Webapp desenvolvida em Angular
    └── src
        └── app                  # Contém componentes, serviços e modelos do projeto
```

### Tecnologia

* [Python](https://www.python.org/)
* [OpenALPR](https://github.com/openalpr/openalpr)
* [OpenCV](https://opencv.org/)
* [RabbitMQ](https://www.rabbitmq.com/)
* [Pygame](https://www.pygame.org/news)
* [NodeJS](https://nodejs.org/en/)
* [PostgreSQL](https://www.postgresql.org/)
* [Angular](https://angular.io/)
* [Raspberry Pi](https://www.raspberrypi.org/)

### Instalação (Linux)

Instalação do openalpr na máquina:

```sh
# Install prerequisites
sudo apt-get install libopencv-dev libtesseract-dev git cmake build-essential libleptonica-dev
sudo apt-get install liblog4cplus-dev libcurl3-dev

# If using the daemon, install beanstalkd
sudo apt-get install beanstalkd

# Clone the latest code from GitHub
git clone https://github.com/openalpr/openalpr.git

# Setup the build directory
cd openalpr/src
mkdir build
cd build

# setup the compile environment
cmake -DCMAKE_INSTALL_PREFIX:PATH=/usr -DCMAKE_INSTALL_SYSCONFDIR:PATH=/etc ..

# compile the library
make

# Install the binaries/libraries to your local system (prefix is /usr)
sudo make install

# Test the library
wget http://plates.openalpr.com/h786poj.jpg -O lp.jpg
alpr lp.jpg
```

Source: [OpenALPR](http://doc.openalpr.com/opensource.html#compiling-openalpr)

Instalar/reinstalar o [Tesseract](https://github.com/tesseract-ocr/tesseract):

```sh
sudo add-apt-repository ppa:alex-p/tesseract-ocr -y
sudo apt-get update -y

#Reinstall tesseract
sudo apt-get purge libtesseract-dev
sudo apt-get install libtesseract-dev
```

Integrar o OpenALPR:

```sh
# Aceder a pasta do openalpr
cd openalpr/src/bindings/python

# Executar
python setup.py install --user
```

Source: [Python binding](https://github.com/openalpr/openalpr/wiki/Integrating-OpenALPR)

### Desenvolvedor

* Jorge Oliveira - 8160579

### License
