FROM cirrusci/flutter:stable

WORKDIR /app/area

COPY . .

RUN sudo chown -R cirrus:cirrus /app/area

RUN flutter pub get
RUN flutter build apk

CMD sudo mv ./build/app/outputs/apk/release/app-release.apk /app/area/apk/client-release.apk