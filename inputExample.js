const input = () => (
    <TextInput
        type="password"
        title="휴대폰 번호"
        placeholder="- 제외하고 번호만 입력해주세요."
        returnKeyType="next"
        keyboardType="number-pad"
        value={watch("phone")}
        onSubmitEditing={() => onNext("password")}
        onReset={() => reset(setValue, "phone")}
        onChangeText={(text) => setValue("phone", text)}
        focus={focus === "password"}
    />
);
