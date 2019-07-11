import * as React from "react";
import * as _ from "underscore";
import {
    Container,
    FormControl,
    InputGroup,
    ButtonToolbar,
    Button,
    FormCheck,
    FormLabel,
    Alert,
} from "react-bootstrap";
import { hot } from "react-hot-loader";
import { ExportFormats, converterFactory } from "../utils/Converter";
import * as fileSaver from "file-saver";
import * as url from "url";
import * as urlParseLax from "url-parse-lax";

// const reactLogo = require("./../assets/img/react_logo.svg");



interface IState {
    format: ExportFormats;
    url: string;
    error: string | undefined;
}

class App extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            error: undefined,
            format: ExportFormats.XLSX,
            url: "",
        };
    }

    public render() {
        return (
            <div className="app">
                <Container className="mt-5 mb-5">
                    <h1>Nightscout Exporter</h1>
                    {this.state.error &&
                        <Alert variant="danger">{this.state.error}</Alert>
                    }
                    <FormLabel htmlFor="url">
                        Your Nighscout API endpoint
                    </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            id="url"
                            value={this.state.url}
                            onChange={(e) => this.changeUrl(e)}
                            placeholder="https://example.com/api/" />
                    </InputGroup>
                    <div className="mb-3">
                        {_.keys(ExportFormats).map((key) =>
                            <FormCheck
                                custom
                                type="radio"
                                label={key}
                                id={key}
                                key={key}
                                checked={this.state.format === ExportFormats[key]}
                                onChange={(e) => this.changeFormat(e, ExportFormats[key])} />
                        )}
                    </div>
                    <ButtonToolbar>
                        <Button variant="primary" onClick={(e) => this.fetchAndConvert()}>Export</Button>
                    </ButtonToolbar>
                </Container>
            </div>
        );
    }

    private changeFormat(e: React.ChangeEvent<HTMLInputElement>, format: ExportFormats) {
        this.setState({
            format,
        });
    }

    private changeUrl(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            url: e.currentTarget.value,
        });
    }

    private buildUrl(apiUrl: string): string {
        if (!apiUrl.endsWith("/")) {
            apiUrl += "/";
        }

        return url.format(urlParseLax(apiUrl)) +
            "v1/entries.json?find[dateString][$gte]=2019-07-05&find[dateString][$lte]=2019-07-06&count=50";
    }

    private fetchAndConvert() {
        fetch(this.buildUrl(this.state.url)).then((response) => response.json(), (err) => {
            this.setState({
                error: "An error happened while trying to query Nightscout: " +
                    (typeof err === "string" ? err : err.toString()),
            });
        }).then((data: object[]) => {
            if (typeof data.length !== "number") {
                throw new Error("Unexpected response from Nightscout");
            }

            const columns = _.keys(data[0]);
            const converter = converterFactory(this.state.format, columns, data);
            const hostName = (urlParseLax(this.state.url).hostname) || "unknown";

            const blob = converter.convert();
            fileSaver.saveAs(blob, hostName + "." + converter.extension);
            this.setState({
                error: undefined,
            });
        }).catch((err) => {
            this.setState({
                error: "An error happened while trying to parse data from Nightscout: " +
                    (typeof err === "string" ? err : err.toString()),
            });
        })
    }
}

declare let module: object;

export default hot(module)(App);
