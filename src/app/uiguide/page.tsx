"use client";
import React, { useState } from "react";
import styles from "./page.module.scss"; // UI 가이드 전용 스타일
import Input, { InputGroupWrap } from "../common/Input";
import Button from "../common/Button";
import { Grid, GridItem } from "../common/layout/Grid";
import CustomSelect from "../common/CustomSelect";
import Checkbox from "../common/CheckBox";
import Radio from "../common/Radio";

const fruitOptions = [
  { value: "apple", label: "사과" },
  { value: "banana", label: "바나나" },
  { value: "orange", label: "오렌지" },
  { value: "grape", label: "포도" },
];
const jobOptions = [
  { value: "devloper", label: "개발자" },
  { value: "ceo", label: "대표자", disabled: true },
  { value: "engineer", label: "엔지니어" },
  { value: "officer", label: "경찰" },
];
const radioOptions = [
  { value: "radio1", label: "라디오1" },
  { value: "radio2", label: "라디오2" },
  { value: "radio3", label: "라디오3", disabled: true },
  { value: "radio4", label: "라디오4" },
];
const radioOptions2 = [
  { value: "radio1", label: "라디오1" },
  { value: "radio2", label: "라디오2" },
  { value: "radio3", label: "라디오3", disabled: true },
  { value: "radio4", label: "라디오4" },
];

const UiGuide = () => {
  const [value, setValue] = useState("");

  const [valueEmail, setValueEmail] = useState("");
  const [error, setError] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  const [country2, setCountry2] = useState("");
  const [country2Error, setCountry2Error] = useState("");
  const [country3, setCountry3] = useState("");
  const [country3Error, setCountry3Error] = useState("");

  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [selected2, setSelected2] = useState<string[]>([]);
  const [selected3, setSelected3] = useState<string>("");
  const [selected4, setSelected4] = useState<string>("");
  const [selected5, setSelected5] = useState<string>("");

  const handleChange = (value: string, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };
  const handleChange2 = (value: string, checked: boolean) => {
    setSelected2((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };
  // const handleChange3 = (value: string, checked: boolean) => {
  //   setSelected3((prev) =>
  //     checked ? [...prev, value] : prev.filter((v) => v !== value)
  //   );
  // };

  return (
    <div>
      <p style={{ fontSize: 18, lineHeight: 1.6, color: "#555" }}>
        이 페이지는 UI 컴포넌트 사용법과 예시를 보여줍니다.
      </p>

      <section className={styles.section}>
        <h2>Button</h2>
        <p>사용자 클릭을 위한 기본 컴포넌트입니다.</p>
        <Grid>
          <GridItem span={8}>
            <Button size="sm">Small 버튼</Button>
            <Button size="sm" variant="secondary">
              보조 버튼
            </Button>
            <Button size="sm" variant="outline">
              테두리 버튼
            </Button>
            <Button size="sm" variant="danger">
              위험 버튼
            </Button>
          </GridItem>
          <GridItem span={8}>
            <Button size="sm" disabled>
              Disabled 버튼
            </Button>
            <Button size="sm" variant="secondary" disabled>
              보조 버튼
            </Button>
            <Button size="sm" variant="outline" disabled>
              테두리 버튼
            </Button>
            <Button size="sm" variant="danger" disabled>
              위험 버튼
            </Button>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem span={18}>
            <Button>Medium 버튼</Button>
            <Button variant="secondary">보조 버튼</Button>
            <Button variant="outline">테두리 버튼</Button>
            <Button variant="danger">위험 버튼</Button>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem span={18}>
            <Button size="lg">Large 버튼</Button>
            <Button size="lg" variant="secondary">
              보조 버튼
            </Button>
            <Button size="lg" variant="outline">
              테두리 버튼
            </Button>
            <Button size="lg" variant="danger">
              위험 버튼
            </Button>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem span={18}>
            <Button size="sm" fullWidth>
              전체 너비 버튼
            </Button>
            <Button fullWidth>전체 너비 버튼</Button>
            <Button size="lg" fullWidth>
              전체 너비 버튼
            </Button>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem span={18}>
            <Button loading>로딩 중 버튼</Button>
            <Button loading variant="secondary">
              로딩 중 보조 버튼
            </Button>
            <Button leftIcon={<span>@</span>}>검색</Button>
            <Button rightIcon={<span>▶</span>}>다음</Button>
          </GridItem>
        </Grid>
      </section>

      <section className={styles.section}>
        <h2>Input</h2>
        <p>사용자 입력을 받기 위한 기본 컴포넌트입니다.</p>
        <Grid columns={18} gap={3}>
          <GridItem span={6}>
            <Input
              id="name-input"
              type="text"
              label="Small"
              inputSize="sm"
              placeholder="이름을 입력하세요"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => setError(value ? "" : "이름을 입력해주세요")}
              error={error}
            />
          </GridItem>
          <GridItem span={6}>
            <Input
              id="name-input"
              type="text"
              label="Medium"
              placeholder="이름을 입력하세요"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => setError(value ? "" : "이름을 입력해주세요")}
              error={error}
            />
          </GridItem>
          <GridItem span={6}>
            <Input
              id="name-input"
              type="text"
              label="Large"
              inputSize="lg"
              placeholder="이름을 입력하세요"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => setError(value ? "" : "이름을 입력해주세요")}
              error={error}
            />
          </GridItem>
        </Grid>
        <Grid>
          <GridItem span={18}>
            <p>
              <b>Input Group</b>
            </p>
            <InputGroupWrap>
              <Input
                id="ip1"
                type="text"
                label="Label"
                placeholder="입력하세요"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => setError(value ? "" : "입력해주세요")}
                error={error}
              />
              <Input
                id="ip2"
                type="text"
                label="Label"
                placeholder="입력하세요"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => setError(value ? "" : "입력해주세요")}
                error={error}
                style={{ width: "250px" }}
              />
              <Input
                id="ip3"
                type="text"
                label="Label"
                placeholder="입력하세요"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => setError(value ? "" : "입력해주세요")}
                error={error}
                style={{ width: "360px" }}
              />
            </InputGroupWrap>
          </GridItem>
        </Grid>
        <Grid columns={18} gap={3}>
          <GridItem span={9}>
            <InputGroupWrap>
              <CustomSelect
                label="국가"
                options={[
                  { value: "", label: "선택하세요" },
                  { value: "kr", label: "대한민국" },
                  { value: "us", label: "미국" },
                  { value: "jp", label: "일본" },
                ]}
                value={country}
                onChange={(value) => setCountry(String(value))}
                size="sm"
                required
                error={countryError}
              />
              <CustomSelect
                label="국가"
                options={[
                  { value: "", label: "선택하세요" },
                  { value: "kr", label: "대한민국" },
                  { value: "us", label: "미국" },
                  { value: "jp", label: "일본", disabled: true },
                ]}
                value={country2}
                onChange={(value) => setCountry2(String(value))}
                size="md"
                required
                error={country2Error}
              />
              <CustomSelect
                label="국가"
                options={[
                  { value: "", label: "선택하세요" },
                  { value: "kr", label: "대한민국" },
                  { value: "us", label: "미국" },
                  { value: "jp", label: "일본" },
                ]}
                value={country3}
                onChange={(value) => setCountry3(String(value))}
                size="lg"
                required
                error={country3Error}
              />
            </InputGroupWrap>
          </GridItem>
        </Grid>
      </section>

      <section className={styles.section}>
        <h2>Checkbox</h2>
        <p>사용자 선택을 위한 체크박스 컴포넌트입니다.</p>
        <Grid columns={18} gap={3}>
          <GridItem span={8}>
            <Checkbox
              id="agree-checkbox"
              label="산택항목"
              checked={checked}
              onChange={setChecked}
            />
            <Checkbox
              id="agree-checkbox2"
              label="선택항목"
              checked={checked2}
              onChange={setChecked2}
            />
            <Checkbox
              id="agree-checkbox3"
              label="선택항목"
              checked={checked3}
              onChange={setChecked3}
              disabled
            />
            <div style={{ marginTop: 8 }}>
              상태: {checked || checked2 ? "체크됨" : "체크 안됨"}
            </div>
          </GridItem>
          <GridItem span={8}>
            {fruitOptions.map((opt) => (
              <Checkbox
                key={opt.value}
                label={opt.label}
                checked={selected.includes(opt.value)}
                onChange={(checked) => handleChange(opt.value, checked)}
                value={opt.value}
              />
            ))}
            <div style={{ marginTop: 8 }}>
              선택된 과일: {selected.length > 0 ? selected.join(", ") : "없음"}
            </div>
          </GridItem>
          <GridItem span={18}>
            <InputGroupWrap>
              {jobOptions.map((opt) => (
                <Checkbox
                  key={opt.value}
                  label={opt.label}
                  checked={selected2.includes(opt.value)}
                  onChange={(checked) => handleChange2(opt.value, checked)}
                  value={opt.value}
                  disabled={opt.disabled}
                />
              ))}
            </InputGroupWrap>
            <div style={{ marginTop: 12 }}>
              선택된 직업:{" "}
              {selected2.length > 0 ? selected2.join(", ") : "없음"}
            </div>
          </GridItem>
        </Grid>
      </section>

      <section className={styles.section}>
        <h2>Radio</h2>
        <p></p>
        <Grid columns={18} gap={3}>
          <GridItem span={8}>
            <Radio
              id="radio"
              name="r1"
              label="선택항목1"
              checked={selected3 === "radio"}
              onChange={() => setSelected3("radio")}
            />
            <Radio
              id="radio2"
              name="r1"
              label="선택항목2"
              checked={selected3 === "radio2"}
              onChange={() => setSelected3("radio2")}
            />
            <Radio
              id="radio3"
              name="r1"
              label="선택항목3"
              checked={selected3 === "radio3"}
              onChange={() => setSelected3("radio3")}
              disabled
            />
            <div style={{ marginTop: 8 }}>
              상태: {selected3 ? "체크됨" : "체크 안됨"}
            </div>
          </GridItem>
          <GridItem span={8}>
            {radioOptions.map((opt) => (
              <Radio
                key={opt.value}
                label={opt.label}
                checked={selected4 === opt.value}
                onChange={() => setSelected4(opt.value)}
                value={opt.value}
                name="radiogroup"
              />
            ))}
            <div style={{ marginTop: 12 }}>
              선택된 과일: {selected4 || "없음"}
            </div>
          </GridItem>
          <GridItem span={18}>
            <InputGroupWrap>
              {radioOptions2.map((opt) => (
                <Radio
                  key={opt.value}
                  label={opt.label}
                  checked={selected5 === opt.value}
                  onChange={() => setSelected5(opt.value)}
                  value={opt.value}
                  name="radiogroup2"
                />
              ))}
            </InputGroupWrap>
            <div style={{ marginTop: 12 }}>
              선택된 과일: {selected5 || "없음"}
            </div>
          </GridItem>
        </Grid>
      </section>

      <section className={styles.section}>
        <h2>Grid</h2>
        <p>2차원 레이아웃을 위한 그리드 시스템입니다.</p>
        <Grid columns={18} gap={5}>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.ex}>
              <b>Item</b>
            </div>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem span={2}>
            <div className={styles.ex}>
              <b>Item 2</b>
            </div>
          </GridItem>
          <GridItem span={2}>
            <div className={styles.ex}>
              <b>Item 2</b>
            </div>
          </GridItem>
          <GridItem span={2}>
            <div className={styles.ex}>
              <b>Item 2</b>
            </div>
          </GridItem>
          <GridItem span={2}>
            <div className={styles.ex}>
              <b>Item 2</b>
            </div>
          </GridItem>
          <GridItem span={2}>
            <div className={styles.ex}>
              <b>Item 2</b>
            </div>
          </GridItem>
          <GridItem span={2}>
            <div className={styles.ex}>
              <b>Item 2</b>
            </div>
          </GridItem>
          <GridItem span={2}>
            <div className={styles.ex}>
              <b>Item 2</b>
            </div>
          </GridItem>
          <GridItem span={2}>
            <div className={styles.ex}>
              <b>Item 2</b>
            </div>
          </GridItem>
          <GridItem span={2}>
            <div className={styles.ex}>
              <b>Item 2</b>
            </div>
          </GridItem>
        </Grid>
      </section>
    </div>
  );
};

export default UiGuide;
