# Docker vs Virtual Machine

## VM

## Docker 

- LXC(Linux Container)
  - OS 수준의 가상화도구
  - croup, namespace 등의 커널 기술을 호스트로부터 공유하여 컨테이너에 제공
- Docker
  - Docker는 LXC (Linux Container) 기술로부터출발 
  - 지속적인 컨테이너 기술의 발전으로, `runC`, `containerd`, `dockerd` 등을 이용하는 방식으로 변경됨
    - `runC`: 커널 기술의 공유를 통해 컨테이너 생성을 지원
      - 커널과의 통신
      - run.docker.sock 소켓 통신을 통해 이루어 짐
    - `containerd`: 생성된 컨테이너의 라이프사이클을 관리를 지원
    - `dockerd`: 사용자 환경에서의 명령을 전달을 지원
      - docker cli api
      - swarmkit
      - logs management
      - storage management
      - libnetwork + CNM(Container Networking Model) Interface 
      - buildket
      - DCT
      - image management

## Container vs. VM

- VM: 가상화는 실제 호스트 운영체제와 같이 별도의 GuestOS를 두고 원하는 애플리케이션을 설치하는 **하드웨어 수준의 가상화**를 구현
- Container: VM에 비해 경량이면서 호스트 운영체제의 kernel을 공유하는 **운영체제 수준의 가상화**를 구현

