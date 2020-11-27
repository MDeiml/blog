{% set dir = page.relative_path | trim_end_matches(pat="index.md") %}
{% set abs_path = "content/" ~ dir ~ path %}
{% set js = load_data(path=abs_path, format="plain") %}
<script>{{ js }}</script>
```js
{{ js | split(pat="// ---") | nth(n=1) | trim}}
```
