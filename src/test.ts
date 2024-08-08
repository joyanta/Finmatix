// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);





////


public class BearerTokenMessageInspector : IClientMessageInspector
{
    private readonly string _token;

    public BearerTokenMessageInspector(string token)
    {
        _token = token;
    }

    public void AfterReceiveReply(ref Message reply, object correlationState) { }

    public object BeforeSendRequest(ref Message request, IClientChannel channel)
    {
        var httpRequestMessage = new HttpRequestMessageProperty();
        httpRequestMessage.Headers["Authorization"] = $"Bearer {_token}";
        request.Properties[HttpRequestMessageProperty.Name] = httpRequestMessage;
        return null;
    }
}
///


public class BearerTokenEndpointBehavior : IEndpointBehavior
{
    private readonly string _token;

    public BearerTokenEndpointBehavior(string token)
    {
        _token = token;
    }

    public void AddBindingParameters(ServiceEndpoint endpoint, BindingParameterCollection bindingParameters) { }

    public void ApplyClientBehavior(ServiceEndpoint endpoint, ClientRuntime clientRuntime)
    {
        clientRuntime.ClientMessageInspectors.Add(new BearerTokenMessageInspector(_token));
    }

    public void ApplyDispatchBehavior(ServiceEndpoint endpoint, EndpointDispatcher endpointDispatcher) { }

    public void Validate(ServiceEndpoint endpoint) { }
}
