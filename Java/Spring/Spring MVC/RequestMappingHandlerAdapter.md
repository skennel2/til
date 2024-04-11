# RequestMappingHandlerAdapter

# default argument resolver
```java
// Annotation-based argument resolution
resolvers.add(new RequestParamMethodArgumentResolver(getBeanFactory(), false));
resolvers.add(new RequestParamMapMethodArgumentResolver());
resolvers.add(new PathVariableMethodArgumentResolver());
resolvers.add(new PathVariableMapMethodArgumentResolver());
resolvers.add(new MatrixVariableMethodArgumentResolver());
resolvers.add(new MatrixVariableMapMethodArgumentResolver());
resolvers.add(new ExpressionValueMethodArgumentResolver(getBeanFactory()));
resolvers.add(new SessionAttributeMethodArgumentResolver());
resolvers.add(new RequestAttributeMethodArgumentResolver());

// Type-based argument resolution
resolvers.add(new ServletRequestMethodArgumentResolver());
resolvers.add(new ServletResponseMethodArgumentResolver());
```


# default return value resolver
```java
// Single-purpose return value types
handlers.add(new ModelAndViewMethodReturnValueHandler());
handlers.add(new ModelMethodProcessor());
handlers.add(new ViewMethodReturnValueHandler());
handlers.add(new ResponseBodyEmitterReturnValueHandler(getMessageConverters()));
handlers.add(new StreamingResponseBodyReturnValueHandler());
handlers.add(new HttpEntityMethodProcessor(getMessageConverters(),
        this.contentNegotiationManager, this.requestResponseBodyAdvice));
handlers.add(new HttpHeadersReturnValueHandler());
handlers.add(new CallableMethodReturnValueHandler());
handlers.add(new DeferredResultMethodReturnValueHandler());
handlers.add(new AsyncTaskMethodReturnValueHandler(this.beanFactory));

// Annotation-based return value types
handlers.add(new ModelAttributeMethodProcessor(false));
handlers.add(new RequestResponseBodyMethodProcessor(getMessageConverters(),
        this.contentNegotiationManager, this.requestResponseBodyAdvice));

// Multi-purpose return value types
handlers.add(new ViewNameMethodReturnValueHandler());
handlers.add(new MapMethodProcessor());

```